# All-in-One Tool — React Edition

Website tiện ích được xây dựng bằng React, Vite và CSS, sử dụng font Inter.

## Chạy trên máy

Cần cài Node.js phiên bản 20 trở lên. Mở terminal trong thư mục dự án rồi chạy:

```bash
npm install
npm run dev
```

## Build kiểm tra

```bash
npm run build
npm run preview
```

## Deploy lên GitHub Pages

1. Tạo repository GitHub tên **`all-in-one-tool`** (hoặc cập nhật `git remote` theo tên repository bạn chọn).
2. Giải nén ZIP và mở terminal trong thư mục `all-in-one-tool`.
3. Thay `YOUR_USERNAME` bằng username GitHub của bạn rồi chạy:

```bash
git init
git add .
git commit -m "Deploy All-in-One Tool"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/all-in-one-tool.git
git push -u origin main
```

Nếu repository đã có Git history hoặc đã được đẩy lên GitHub, không chạy lại `git init`; hãy cập nhật remote nếu cần và push theo trạng thái hiện tại.

4. Trên GitHub, vào **Settings → Pages**.
5. Trong **Build and deployment**, chọn **Source: GitHub Actions**.
6. Mở tab **Actions** và chờ workflow **Deploy All-in-One Tool to GitHub Pages** hoàn tất.
7. Với repository tên `all-in-one-tool`, địa chỉ dự kiến là `https://YOUR_USERNAME.github.io/all-in-one-tool/`.

Workflow `.github/workflows/deploy.yml` tự động build và deploy mỗi khi push lên nhánh `main`. Vite dùng `base: './'` để các tài nguyên hoạt động trên GitHub Pages.

## Ghi chú

- Thời tiết cần kết nối Internet để lấy dữ liệu.
- Code Studio cho phép soạn, xem trước HTML/CSS/JavaScript và tải mã nguồn; Python/C++ là trình soạn mã, cần môi trường chạy riêng để thực thi.
