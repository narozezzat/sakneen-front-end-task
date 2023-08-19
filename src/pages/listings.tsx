import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { Input } from 'antd';
import Image from 'next/image';
import {useQueryParam, StringParam,NumberParam, withDefault} from 'use-query-params';
import { FilterValue } from 'antd/es/table/interface';


interface Listing {
  id: number;
  for_sale: string;
  photos: string[];
  unit_id: string;
  total_price: number;
  unit_type: string;
  bua: number;
}

interface SalesPageProps {
  listings: Listing[];
}

export default function SalesPage({ listings: initialListings }: SalesPageProps) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [query, setQuery] = useQueryParam({
    page: withDefault(NumberParam, 1),
    search: withDefault(StringParam, null)
  })

  function handleChangePage(pagination:TablePaginationConfig, _filter:Record<string, FilterValue | null>,_sorter) {
    // setQuery({page})
    console.log(pagination);
    
  }

  const columns: ColumnsType<Listing> = [
    {
        title: 'Unit ID',
        dataIndex: 'unit_id',
        key: 'unit_id',
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
              style={forSale === true ? {backgroundColor: "#2419BE"}: {backgroundColor: "#616161"}}>
                {forSale ? 'FOR SALE'  : 'NOT FOR SALE'}
            </button>
        ),
    },
    {
        title: 'Gallery',
        dataIndex: 'photos',
        key: 'photos',
        render: (photos) => (
          <Image src={photos[0]} alt="" width={40} height={40} />
        ),
    },
  ];

 // Flitration
  const handleFilter = async (unitId: string) => {
    setQuery({search: unitId})
    };

    useEffect(()=>{
    },[query])

  return (
    <div className='container max-w-screen-lg mx-auto my-12'>
      
      <div className="mb-3 text-[24px]">
        <h1>Dashboard</h1>
      </div>

      <div className="flex items-center mb-5">
        {/* <IoHome className="text-gray-400 mr-2 flex" /> */}
        <Input
          placeholder="Home" 
          className="input-dashboard rounded-none focus:border-gray-400 hover:border-gray-400" 
        />
      </div>


      <div className="mb-3 focus:border-black	flex justify-between">

        <label><span className='font-bold'>
          Filters by ID: </span><input type="text" placeholder="ex: C1-B1-6-1"
          onChange={(e) => handleFilter(e.target.value)} />
        </label>

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
        pagination={{ 
          pageSize: 10,
          current: query.page,
          total: 50, // this must return from backend
          className: 'pagination container mx-auto'
        }} 
      />

    </div>
  );
}

// fetch data
export const getStaticProps: GetStaticProps<SalesPageProps> = async () => {
  const response = await fetch('http://localhost:3005/listings'); // call the funtion to get listings
  const listings: Listing[] = await response.json();

  return {
    props: {
      listings,
    },
  };
};