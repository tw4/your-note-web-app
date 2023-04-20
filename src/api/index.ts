import { Note } from '@/types';
import { afterWrite } from '@popperjs/core';
import { json } from 'stream/consumers';

export const getUserData = async (token: string) => {
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getNoteList = async (token: string) => {
  const response = await fetch('/api/note', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addNote = async (token: string, note: Note) => {
  const response = await fetch('/api/note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
      category: note.category,
      createdAt: new Date().toLocaleDateString('en-GB'),
      noteID: note.id === '' ? 'undefined' : note.id,
    }),
  });
  return response.json();
};

export const deleteNote = async (token: string, id: string) => {
  const response = await fetch('api/note' + '?noteID=' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const getCategoryList = async (token: string) => {
  const response = await fetch('api/category', {
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const addCategory = async (token: string, category: string) => {
  const response = await fetch('api/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ category: category }),
  });
  return response.json();
};

export const deleteCategory = async (token: string, category: string) => {
  const response = await fetch('api/category?' + 'category=' + category, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.API_KEY!,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
