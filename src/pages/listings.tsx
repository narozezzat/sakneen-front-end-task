import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { FilterValue } from 'antd/es/table/interface';
import { Table, Image } from 'antd';
import { useQueryParams, StringParam, NumberParam, withDefault } from 'use-query-params';
import React, { useEffect, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, TOTAL } from '@/common/constants';
import { getListings } from '@/ApiRequest/listing';
import { Listing, Query } from '@/common/types';

const OrderMapping: { [key: string]: 'asc' | 'desc' } = {
  ascend: 'asc',
  descend: 'desc',
}


const ListingsPage: React.FC<any> = () => {
  const [listings, setListings] = useState<Listing[]>( []);
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
    setQuery({ unit_id_like: unitId });
  };


  const columns: ColumnsType<Listing> = [
    {
      title: 'Unit ID',
      dataIndex: 'unit_id',
      key: 'unit_id',
      sorter: true,
      width: 250
    },
    {
      title: 'Unit Type',
      dataIndex: 'unit_type',
      key: 'unit_type',
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `${price} EGP`,
    },
    {
      title: 'Bulid Up Area',
      dataIndex: 'bua',
      key: 'bua',
      render: (bua) => `${bua} m²`,
    },
    {
      title: 'For Sale',
      dataIndex: 'for_sale',
      key: 'for_sale',
      render: (forSale) => (
        <button className="border p-2 text-sm/[5px] rounded text-white"
          style={forSale === true ? { backgroundColor: "#2419BE" } : { backgroundColor: "#616161" }}>
          {forSale ? 'FOR SALE' : 'NOT FOR SALE'}
        </button>
      ),
    },
    {
      title: 'Gallery',
      dataIndex: 'photos',
      key: 'photos',
      render: (photos) => (
        <Image src={photos[0] || 'assets/sakneen1.png'} alt="" width={40} height={40} />
      ),
    },
  ];

  useEffect(() => {
    getListings(query as unknown as Query).then((listings) => {
      setListings(listings)
    })
  }, [query])

  return (
    <div className='container max-w-screen-lg mx-auto my-12'>

      <div className="mb-3 text-[24px]">
        <h1>Dashboard</h1>
      </div>

      <div className="mb-3 focus:border-black	flex justify-between">

        <span className='font-bold'>
          Filters by ID:
        </span>
        <input type="text" placeholder="ex: C1-B1-6-1"
          onChange={(e) => handleFilter(e.target.value)} />

        <label htmlFor="filters">
          Sort by:
          <select name="" id="filters" className="mx-2 bg-white font-semibold">
            <option value="Unit ID">Unit ID</option>
            <option value="Unit type">Unit type</option>
            <option value="Unit Price">Unit Price</option>
          </select>
        </label>

      </div>

      <Table
        dataSource={listings}
        columns={columns}
        onChange={handleChangePage}
        loading={listings.length === 0}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          current: query.page,
          total: TOTAL, // this must return from backend
          className: 'pagination container mx-auto'
        }}
      />
    </div>
  );
}


export default ListingsPage;