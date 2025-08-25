## [1.1.1](https://github.com/natinium/me-drive/compare/v1.1.0...v1.1.1) (2025-08-25)

### Bug Fixes

- add newline at end of CI workflow file ([268a0b5](https://github.com/natinium/me-drive/commit/268a0b5837b731ec6279736da4e6eded70795179))

# [1.1.0](https://github.com/natinium/me-drive/compare/v1.0.0...v1.1.0) (2025-08-25)

### Features

- update CI workflow with caching and codecov support ([1a4c312](https://github.com/natinium/me-drive/commit/1a4c31226c086230d491404f8dfc75ab3f1e818b))

# 1.0.0 (2025-08-25)

### Bug Fixes

- **api:** correctly handle parentId in listFolders ([0b8bd88](https://github.com/natinium/me-drive/commit/0b8bd88d4856985222e598fc5be60785c6ca135b))
- **api:** Handle undefined parentId in listFolders ([8d2ed39](https://github.com/natinium/me-drive/commit/8d2ed3932c0845a07a4b4c9d213a246760b3488f))
- **auth:** add missing @radix-ui/react-label dependency for Label component ([6e0add5](https://github.com/natinium/me-drive/commit/6e0add506925d6a409278fef3ead9ac8cbfc3a43))
- **auth:** auto-login after registration ([aaba866](https://github.com/natinium/me-drive/commit/aaba86603311f782f8257fde75808be68957ca5d))
- **auth:** pass server session to client provider for immediate UI updates ([d90d73d](https://github.com/natinium/me-drive/commit/d90d73d19e381af86906d309eebb881b26929d80))
- **auth:** use server action for signout ([6f5a030](https://github.com/natinium/me-drive/commit/6f5a030ddce4eda44beeba4364267a158a9f4b81))
- **config:** track ui-docs in git ([0e88e25](https://github.com/natinium/me-drive/commit/0e88e250562db37565a98cdefd9de775fd725b2b))
- correct import paths for marketing components ([8eb5c60](https://github.com/natinium/me-drive/commit/8eb5c60f29b1d3c0ee9bb119be8b18ab57f6a76b))
- **drive:** correct data handling for files and folders ([61bfa15](https://github.com/natinium/me-drive/commit/61bfa1543d199f4b58586d4edd26552abffd1adc))
- **drive:** Correctly invalidate drive items query ([e87dd9f](https://github.com/natinium/me-drive/commit/e87dd9f629c7b9b3567acb5b8927148c134066f0))
- **server:** update storage service to use correct Cloudinary credentials ([4f81129](https://github.com/natinium/me-drive/commit/4f81129324e9fe16c86e386f4ed565279128d9c8))
- update yarn.lock file ([54a0b54](https://github.com/natinium/me-drive/commit/54a0b54a99ab2b9f9a9af1e15ea3673e29b3d2b1))
- **web:** apply flexbox centering to Feature and CTA sections ([7a383e6](https://github.com/natinium/me-drive/commit/7a383e69e7c89d68c9d2a754dd3b32c906487c91))
- **web:** center hero section content ([a3ecd28](https://github.com/natinium/me-drive/commit/a3ecd28dc711a1ea7a5951f7a8246b05c1019e3c))
- **web:** ensure CTA section content is centered ([28b07d7](https://github.com/natinium/me-drive/commit/28b07d793ef29c20cbc929a0cb999833ae84fde7))
- **web:** resolve module import errors ([edc81c1](https://github.com/natinium/me-drive/commit/edc81c1d86703b95be2a2afbbab04e2b10f51373))
- **web:** various UI and component fixes ([0402e2d](https://github.com/natinium/me-drive/commit/0402e2d9cd6ea4b2e285147278e3125f900866a6))

### Features

- add semantic-release configuration ([df6f631](https://github.com/natinium/me-drive/commit/df6f6315ddb5a031a40960d1c62e0ef1ab8f0a00))
- **auth:** add initial auth.ts and middleware.ts ([4e7806c](https://github.com/natinium/me-drive/commit/4e7806c56bce81665fb21607d59e1902127a2300))
- **auth:** add login and signup page UI with shadcn components ([0ed6f57](https://github.com/natinium/me-drive/commit/0ed6f57ebc9c621b9995e174cfade533022c0084))
- **auth:** add login and signup pages with shadcn/ui components ([4ae87dc](https://github.com/natinium/me-drive/commit/4ae87dcd7b81036054375a4e0a3729e420f39727))
- **auth:** add login and signup pages with shadcn/ui components ([7acc4b4](https://github.com/natinium/me-drive/commit/7acc4b46dc722964f38d059755dca3ba100c8266))
- **auth:** add reusable auth components and improve UI consistency ([81d4214](https://github.com/natinium/me-drive/commit/81d42140370c6074dac5135d668b2cea56165eb8))
- **auth:** add signout functionality ([9055a16](https://github.com/natinium/me-drive/commit/9055a1664c67e7989b8039e83a80593ea14213c0))
- **auth:** add signout functionality to navbar ([1db5c21](https://github.com/natinium/me-drive/commit/1db5c2153715ead42e2d6ff03bcae6076674d553))
- **auth:** display user information and add sign out ([93c963d](https://github.com/natinium/me-drive/commit/93c963d75a67ecbc1687654ff1372bad377f18ae))
- **auth:** implement credentials authentication ([72a7b3b](https://github.com/natinium/me-drive/commit/72a7b3bcded1aa6b3524c32c5b4d815840f427be))
- **auth:** implement custom session provider ([cd4ae0d](https://github.com/natinium/me-drive/commit/cd4ae0d3d61ee817c2535d0aff6033b3e3399080))
- **auth:** implement full signup functionality ([652d5b0](https://github.com/natinium/me-drive/commit/652d5b0a55aa46495514cb4462b84f626ea867b7))
- **auth:** improve login and signup forms ([495ee5a](https://github.com/natinium/me-drive/commit/495ee5ac7a03382806338a7241c85da56df03af5))
- **auth:** protect core web app pages ([388dfde](https://github.com/natinium/me-drive/commit/388dfdec5e0838f1962bd7350840ada4af0275ad))
- **auth:** update login and signup forms ([ef919a9](https://github.com/natinium/me-drive/commit/ef919a956ef78f4de59446a5a5d8c8950a848aaf))
- **ci:** implement semantic release workflow ([bbc3163](https://github.com/natinium/me-drive/commit/bbc31635e404f9828915a50625b082a72b85153d))
- **deploy:** add Vercel and Render deployment configurations ([3cd9447](https://github.com/natinium/me-drive/commit/3cd94472b9d16bc185903e3b3c249188a9cc9f98))
- **deps:** add next-auth and cloudinary dependencies ([e50dc9d](https://github.com/natinium/me-drive/commit/e50dc9d871d019cba4227dcc8706ff26703260bf))
- **deps:** add table, dropzone, and state management libraries ([5c8f00b](https://github.com/natinium/me-drive/commit/5c8f00b95bc44feb36a9f5b39e1170816afe5b58))
- **drive:** Add columns and row actions for drive data table ([3db63ee](https://github.com/natinium/me-drive/commit/3db63ee80d686e3b3af3518533b6e3c9c162fecd))
- **drive:** Refactor drive page to use data table ([958c85c](https://github.com/natinium/me-drive/commit/958c85c6edfac00545c6036747bcfc63fe7ad431))
- **env:** add environment example files for server and web apps ([8772026](https://github.com/natinium/me-drive/commit/87720269dd0c91810dc5c3e39476aa2c129f3bb1))
- **server:** add database schema and migrations ([ed50ba0](https://github.com/natinium/me-drive/commit/ed50ba0f9ff5f914bfc667f31ff12269a59dfc32))
- **server:** add local storage driver and admin module ([6ef753c](https://github.com/natinium/me-drive/commit/6ef753c6d288f71d3322fd32044e48c0b75de24b))
- **server:** add PostgreSQL init migration ([c4ad1b4](https://github.com/natinium/me-drive/commit/c4ad1b402a6adcbfffcd1a391e048b7bedeb086b))
- **server:** configure CORS, validation, and Swagger docs ([7bc580b](https://github.com/natinium/me-drive/commit/7bc580ba866141da865c5816325e988cbb93abb9))
- **server:** implement authentication and file management APIs ([74cb910](https://github.com/natinium/me-drive/commit/74cb9108c530db08566471bcb6f38a7f5ce333b5))
- **server:** migrate from SQLite to PostgreSQL ([8e54df9](https://github.com/natinium/me-drive/commit/8e54df907884ad391c8d8d68e14358d74dd27230))
- **server:** update Prisma service to use DATABASE_URL ([190d0c7](https://github.com/natinium/me-drive/commit/190d0c774979e75f02812e74135f90f884332e64))
- **server:** update storage service to use Cloudinary URL format ([25b6319](https://github.com/natinium/me-drive/commit/25b63190f0c1c99efc99ea65601a6dc8af862e3d))
- setup semantic release with changelog generation and version bumping ([545a01a](https://github.com/natinium/me-drive/commit/545a01a10d336ec723f3c7c9ce60a26517c728a5))
- **ui:** add new ui components ([2a38a43](https://github.com/natinium/me-drive/commit/2a38a43af76d7494025b08874bce3dc66616ab95))
- **ui:** Add reusable data table component ([fb8980d](https://github.com/natinium/me-drive/commit/fb8980db5bffe0fd2af8258d41ab4e5f3da32226))
- **ui:** update session management in layout ([a0bc4a3](https://github.com/natinium/me-drive/commit/a0bc4a3136467a51f0a6fa9a1241c0a04ee42238))
- **web-ui:** Implement core application layout and navigation ([1d0a239](https://github.com/natinium/me-drive/commit/1d0a2391bd2bdf0cd03dcbfad5b5104ea2c55ee7))
- **web:** add dedicated pages for features, pricing, terms, and privacy ([9169215](https://github.com/natinium/me-drive/commit/916921559c35fedbec4b42ff096b5828a37e2fc2))
- **web:** Add new folder and upload buttons ([002c601](https://github.com/natinium/me-drive/commit/002c60173396bcbd2812c0165c169881cb6da62d))
- **web:** Add new test files for layout, sidebar, and drive store ([942b11c](https://github.com/natinium/me-drive/commit/942b11ccda56547e4dac33a4e64d3890c2ad47a6))
- **web:** add placeholder pages for profile and settings ([fcdcfde](https://github.com/natinium/me-drive/commit/fcdcfded82fb78bceb993a07e4712c925ee85de1))
- **web:** add state management and type definitions ([2e3dacb](https://github.com/natinium/me-drive/commit/2e3dacb44a4c026f9ba6d69958eaa50fa4d4796c))
- **web:** complete marketing landing page ([e7aabc1](https://github.com/natinium/me-drive/commit/e7aabc1143b060f8d4666440e38df9b591761b05))
- **web:** enhance marketing landing page with complete sections ([593ce40](https://github.com/natinium/me-drive/commit/593ce400c9fca70cb6ae08f3a2706592892f7843))
- **web:** implement custom session provider and layout updates ([9419479](https://github.com/natinium/me-drive/commit/94194795ae381ac9267fc636f26211469b3faee5))
- **web:** implement dashboard and drive UI ([7086d1a](https://github.com/natinium/me-drive/commit/7086d1a7a7a9cafb040f40f29b35dad7dcc80d39))
- **web:** implement global modals components with stories and tests ([f9cb9cc](https://github.com/natinium/me-drive/commit/f9cb9cc2786c896e554de0e885dfacf4d0e1c2df))
- **web:** Implement global modals for drive actions ([0e76795](https://github.com/natinium/me-drive/commit/0e767959aabfa6ecfac1476b66e31f28e2153489))
- **web:** implement new navbar component ([3946cfe](https://github.com/natinium/me-drive/commit/3946cfec0361e341641ea660fcb5886f249ed3cb))
- **web:** implement new sidebar component ([561918b](https://github.com/natinium/me-drive/commit/561918b1a3a3b60166b5b5e125f91ad5c0252afb))
- **web:** implement profile feature components ([2e85dbc](https://github.com/natinium/me-drive/commit/2e85dbc83756780bb27d73eacb6ac558b54e1838))
- **web:** integrate frontend with backend authentication ([96b6089](https://github.com/natinium/me-drive/commit/96b60899a5f302fbe04038866c6ec7bea090f3e4))
- **web:** integrate react-query for data fetching ([bb7c68c](https://github.com/natinium/me-drive/commit/bb7c68cc504080bc5f6d9d5a2b68705eab7dbb07))
- **web:** overhaul application layout and navigation ([89d8a8e](https://github.com/natinium/me-drive/commit/89d8a8ec8f53c8c49d54533ef4ca2679bb2e4afd))
- **web:** scaffold marketing page components ([aed80c6](https://github.com/natinium/me-drive/commit/aed80c68770e6e9ac583873f8842b3d7c6eb9085))
- **web:** setup shadcn/ui and related dependencies for web app ([b034b58](https://github.com/natinium/me-drive/commit/b034b58d9b7b9762198b743a1aadb558114781e0))
- **web:** update auth and layout components ([a06ddc8](https://github.com/natinium/me-drive/commit/a06ddc84d7b96db32fcdfa0d68d21ff107b41e23))
- **web:** update layout exports ([e9cf15f](https://github.com/natinium/me-drive/commit/e9cf15ffa1045c81b4466edd2ca94c3f6762726d))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
