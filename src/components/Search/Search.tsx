import React, { FormEvent, useState } from 'react';

import './Search.css';
import { Magnifier } from '../../assets';
import { useLocation } from 'react-router-dom';
import { apiServer, endpoints } from '../../services';
import { ArticleInterface, PaginatedResource } from '@backendTypes';

export const Search = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState<null | number>(null);
  const order = query.get('sort') || 'createdAt:desc';
  // const page = parseInt(query.get('page') || '1');
  const size = parseInt(query.get('perPage') || '9');

  const updateForm = (value: string) => {
    setSearchTerm(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data: res } = await apiServer.get<PaginatedResource<Partial<ArticleInterface>>>(
      `${endpoints.searchArticle}?size=${size}&sort=${order}`,
    );
    console.log(res);
    if (res && res.totalItems) setTotal(res.totalItems);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="Search articles..." onChange={(e) => updateForm(e.target.value)} />
          <img src={Magnifier} alt="magnifier - search input" />
        </label>
        <div className="found">Items found: {total}</div>
        <div className="search-dropdown" style={{ border: '1px solid red' }}>
          <div className="size">{size}</div>
          <div className="order">{order}</div>
        </div>
      </form>
      <button type="submit">Search</button>
    </div>
  );
};
