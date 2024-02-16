import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { FilterValue } from 'antd/es/table/interface';
import { Table } from 'antd';
import { useQueryParams, StringParam, NumberParam, withDefault } from 'use-query-params';
import React, { useEffect, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, TOTAL } from '@/common/constants';
import { getListings } from '@/ApiRequest/listing';
import { Listing, Query } from '@/common/types';
import { GoHomeFill } from 'react-icons/go';
import 'react-image-lightbox/style.css';
import LightboxComponent from '../../components/LightBox';

const OrderMapping: { [key: string]: 'asc' | 'desc' } = {
  ascend: 'asc',
  descend: 'desc',
}

const ReverseOrderMapping: { [key: string]: 'ascend' | 'descend' } = {
  asc: 'ascend',
  desc: 'descend'
}

const ListingsPage: React.FC<any> = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [photos, setPhotos] = useState<string[]>([]);
  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, DEFAULT_PAGE),
    limit: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
    _sort: withDefault(StringParam, null),
    unit_id_like: withDefault(StringParam, null),
    _order: withDefault(StringParam, null),
  });

  const handleChangePage = (
    pagination: TablePaginationConfig,
    _filter: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    if (pagination?.current) {
      setQuery({ page: pagination.current });
    }

    if (sorter.field) {
      setQuery({ _sort: sorter.field, _order: OrderMapping[sorter.order] });
    }
  };

  const handleFilter = (unitId: string) => {
    setQuery({ unit_id_like: unitId, page:1 });
  };

  const openLightbox = (photos: string[]) => {
    setLightboxOpen(true);
    setPhotos(photos)
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const columns: ColumnsType<Listing> = [
    {
      title: 'Unit ID',
      dataIndex: 'unit_id',
      key: 'unit_id',
      sorter: true,
      width: 200,
      className: "font-bold underline",
      sortOrder: query._sort === 'unit_id' ? ReverseOrderMapping[query._order as unknown as string] : undefined,
    },
    {
      title: 'Unit Type',
      dataIndex: 'unit_type',
      key: 'unit_type',
      sortOrder: query._sort === 'unit_type' ? ReverseOrderMapping[query._order as unknown as string] : undefined,
      sorter: true,
      render: (unit_type) => <span className='capitalize'>{unit_type}</span>
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `${Math.ceil(price).toLocaleString('us')} EGP`,
      sortOrder: query._sort === 'total_price' ? ReverseOrderMapping[query._order as unknown as string] : undefined,
      sorter: true,
    },
    {
      title: 'Bulid Up Area',
      dataIndex: 'bua',
      key: 'bua',
      sorter: true,
      render: (bua) => `${bua} m²`,
      sortOrder: query._sort === 'bua' ? ReverseOrderMapping[query._order as unknown as string] : undefined,
    },
    {
      title:  <span className="font-bold">For Sale</span>,
      dataIndex: 'for_sale',
      key: 'for_sale',
      render: (forSale) => (
        <div className='button-container'>
          <button className="border p-2 text-sm/[5px] btn rounded text-white"
            style={forSale === true ? { backgroundColor: "#2419BE", fontSize: "9px" } : { backgroundColor: "#616161", fontSize: "9px" }}>
            {forSale ? 'FOR SALE' : 'NOT FOR SALE'}
          </button>
        </div>
      ),
    },
    {
      title:  <span className="font-bold">Gallery</span>,
      dataIndex: 'photos',
      key: 'photos',
      render: (photos) => (
        <img src={photos[0] || '/unit.webp'} alt="" onClick={() => openLightbox(photos)} className='img' />
      )
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getListings(query as unknown as Query).then((listings) => {
      setListings(listings);
      setIsLoading(false)
    }).catch(()=>{
      setIsLoading(false)
    })
  }, [query])


  return (
   <>
     <div className="max-w-screen-lg mt-2 mx-auto text-[1.5rem] font-bold">
        <h1>Dashboard</h1>
      </div>
    <div className='max-w-screen-lg mx-auto my-4 bg-white p-4'>
      <ul className="flex breadcrumb mb-5 rounded-sm">
        <GoHomeFill className='h-6 text-gray-500 w-6' />
        <li><a href="/" className='ml-2 underline'>Home</a></li>
        <li><a href="#">Dachboard</a></li>
      </ul>
      <div className="mb-5 flex items-center">

        <span className='font-medium mx-2'>
          Filters by ID:
        </span>
        <input type="text" className='text-sm rounded-sm flex-1' placeholder="ex: C1-B1-6-1"
          onChange={(e) => handleFilter(e.target.value)} value={query.unit_id_like as string} />

      </div>

      <div className='overflow-x-auto divide-y whitespace-nowrap'>
        <Table
          dataSource={listings}
          columns={columns}
          onChange={handleChangePage}
          loading={isLoading}
          pagination={{
            pageSize: DEFAULT_PAGE_SIZE,
            current: query.page,
            total: query.unit_id_like ? listings.length: TOTAL, // this must return from backend
            className: 'custom-pagination pagination' 
          }}
        />
      </div>
      {lightboxOpen && (
        <LightboxComponent
          photos={photos}
          onClose={closeLightbox}
        />
      )}
    </div>
   </>
  );
}


export default ListingsPage;