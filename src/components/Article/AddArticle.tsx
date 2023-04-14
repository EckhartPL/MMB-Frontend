import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokensContext } from "../../contexts/token.context";
import { Btn } from "../common/Btn/Btn";
import { Logout } from "../common/Popup/Logout";
import { CreateArticleResponse } from "types";

import './AddArticle.css';

export const AddArticle = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateArticleResponse>({
    title: '',
    description: '',
  });
  const navigate = useNavigate();
  const { tokens } = useContext(TokensContext); 

  const saveArticle = async (e: FormEvent) => {
    e.preventDefault();

    if (tokens.access_token === '' || tokens.access_token === '') {
      throw new Error('Access Denied!');
    }

    setLoading(true);

    try {
      await fetch('http://localhost:3001/article', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokens.access_token}`,
        },
        body: JSON.stringify(form),
      })
        .then(res => res.json())
        // .then(data => console.log(data));
      navigate('/article/1');
      <Logout msg={'test'} />
    } finally {
      setLoading(false);
    }
  }

  const updateForm = (key: string, value: string) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }))
  };

  if (loading) {
    <h2>Trwa dodawanie artykułu...</h2>
  }

  return (
    <div className="form-container">
      <form className="add-article-form" onSubmit={saveArticle}>
        <h1>Add article</h1>
        <div className="add-article-title">
          <label>Title</label>
          <input
            type="text"
            name="title"
            required
            maxLength={50}
            value={form.title}
            onChange={e => updateForm('title', e.target.value)}
          />
        </div>
        <div className="add-article-description">
          <label>Description</label>
          <textarea
            name="description"
            required
            maxLength={9999}
            value={form.description}
            onChange={e => updateForm('description', e.target.value)}
          />
        </div>
        
        <div className="btn-container">
          <Btn text="Save Article" />
        </div>
      </form>
    </div>
  );
};