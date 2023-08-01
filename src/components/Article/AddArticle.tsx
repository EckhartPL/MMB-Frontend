import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { apiServer, endpoints } from '../../services';
import { Btn } from '../common/Btn/Btn';

import './AddArticle.css';
import { CreateArticleResponse } from '@backendTypes';
import { useAuth } from '../../contexts';

export function AddArticle() {
  const [form, setForm] = useState<CreateArticleResponse>({
    title: '',
    description: '',
  });
  const { tokens } = useAuth();
  const navigate = useNavigate();

  const saveArticle = async (e: FormEvent) => {
    e.preventDefault();

    const response = await apiServer.post(endpoints.addArticle, form, tokens?.access_token);

    if (response.ok && response.statusCode === 201) {
      navigate(routes.article);
    } else {
      alert("Something's went wrong");
    }
  };

  const updateForm = (key: string, value: string) => {
    setForm((formData) => ({
      ...formData,
      [key]: value,
    }));
  };

  return (
    <div className="form-container">
      <form className="add-article-form" onSubmit={saveArticle}>
        <h1>Add article</h1>
        <div className="add-article-title">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            name="title"
            required
            maxLength={50}
            value={form.title}
            onChange={(e) => updateForm('title', e.target.value)}
          />
        </div>
        <div className="add-article-description">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            required
            maxLength={9999}
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
          />
        </div>

        <div className="btn-container">
          <Btn text="Save Article" />
        </div>
      </form>
    </div>
  );
}
