import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///finance_tracker.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'a3f5d2c9b6e84c3aa8239f5f1cabc2c8c38a4c9e9d3d4a8e5f0f6a2d9b4e2f1d'
    JWT_SECRET_KEY = '7c6a180b36896a0a8c02787eeafb0e4c9fbbc96cc6a2e4edc9a1f2b8d59b2b8a'