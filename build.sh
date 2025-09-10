#!/bin/bash

# SMIT Workspace Build Script
echo "🚀 Building SMIT Workspace..."

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# Setup Backend
echo "🔧 Setting up Backend..."
cd backend
npm install
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "🌐 To run the application:"
echo "  Frontend: cd frontend && npm run dev"
echo "  Backend:  cd backend && npm start"
echo ""
echo "📚 UI Enhancement Guide: frontend/UI_ENHANCEMENT_GUIDE.md"
