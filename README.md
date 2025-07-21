# MeDrive

An opensource google drive alternative that you can host.

[![CI pipeline](https://github.com/natinium/me-drive/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/natinium/me-drive/actions/workflows/ci.yaml)

# Tech stack used

Repo: monorepo (turborepo)

## Frontend

framework: Next js v15, app routing
auth: auth js
state: zustand
validation: zod
styling: Tailwind
ui components: shadcn
data: tanstack query

## Backend

framework: Nest js
database: supabase + prisma
api docs: swagger

## dev tools

githooks: husky
linting: commitlint, eslint, prettier, lintstaged

## CICD

service: github actions
release: semantic release

## services

frontend hosting: vercel
backend hosting: render
databse: supabase
fil hosting: cloudinary
