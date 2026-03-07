# ระบบจองตั๋วรถโดยสาร (Bus Ticket Booking System)

ระบบจองตั๋วรถโดยสารออนไลน์ที่ทันสมัย สร้างด้วย Next.js 15, TypeScript และ Tailwind CSS พร้อมการออกแบบที่รองรับการใช้งานบนหน้าจอหลากหลายขนาด

## ✨ คุณสมบัติหลัก

- 🔍 **ค้นหาเส้นทาง** - ค้นหาเส้นทางรถโดยสารที่ต้องการได้อย่างง่ายดาย
- 🎫 **จองตั๋วออนไลน์** - ระบบจองตั๋วที่สะดวกและปลอดภัย
- 💺 **เลือกที่นั่ง** - เลือกที่นั่งที่ต้องการได้ด้วยตนเอง
- 💳 **ชำระเงินหลากหลายช่องทาง** - รองรับการชำระเงินหลายรูปแบบ
- 📱 **Responsive Design** - ใช้งานได้ลื่นไหลบนทุกอุปกรณ์
- 🌐 **รองรับภาษาไทย** - อินเทอร์เฟซภาษาไทยที่เข้าใจง่าย

## 🛠️ เทคโนโลยีที่ใช้

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Heroicons + Lucide React
- **UI Components:** Headless UI
- **Date Handling:** date-fns

## 🚀 การติดตั้งและรันโปรเจกต์

### ข้อกำหนดระบบ
- Node.js 18.17 หรือสูงกว่า
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd bus-ticket
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **รันโปรเจกต์ในโหมด development**
   ```bash
   npm run dev
   ```

4. **เปิดเบราว์เซอร์และไปที่**
   ```
   http://localhost:3000
   ```

## 📁 โครงสร้างโปรเจกต์

```
bus-ticket/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── booking/           # หน้าจองตั๋ว
│   │   ├── search/            # หน้าค้นหาเส้นทาง
│   │   ├── layout.tsx         # Layout หลัก
│   │   └── page.tsx           # หน้าหลัก
│   ├── components/            # React Components
│   │   ├── BookingForm.tsx    # ฟอร์มข้อมูลผู้โดยสาร
│   │   ├── BookingSummary.tsx # สรุปการจอง
│   │   ├── Features.tsx       # คุณสมบัติของเว็บไซต์
│   │   ├── Footer.tsx         # ส่วนท้ายเว็บ
│   │   ├── Hero.tsx           # ส่วนหัวเว็บ
│   │   ├── Navbar.tsx         # แถบนำทาง
│   │   ├── PopularRoutes.tsx  # เส้นทางยอดนิยม
│   │   ├── SearchForm.tsx     # ฟอร์มค้นหา
│   │   ├── SearchResults.tsx  # ผลการค้นหา
│   │   └── SeatSelection.tsx  # เลือกที่นั่ง
│   └── styles/
├── .github/
│   └── copilot-instructions.md # คำแนะนำสำหรับ GitHub Copilot
└── ...
```

## 🎨 หน้าเว็บไซต์

### หน้าหลัก (/)
- Hero section พร้อม call-to-action
- ฟอร์มค้นหาเส้นทาง
- คุณสมบัติของระบบ
- เส้นทางยอดนิยม

### หน้าค้นหา (/search)
- ฟอร์มค้นหาขั้นสูง
- ผลการค้นหาพร้อมตัวกรอง
- การเรียงลำดับผลลัพธ์

### หน้าจองตั๋ว (/booking/[id])
- เลือกที่นั่ง
- กรอกข้อมูลผู้โดยสาร
- สรุปการจองและชำระเงิน

## 📱 Responsive Design

ระบบรองรับการใช้งานบนหน้าจอหลากหลายขนาด:

- **Desktop** (1280px+): แสดงผลแบบเต็มขนาดพร้อมฟีเจอร์ครบถ้วน
- **Tablet** (768px - 1279px): ปรับการจัดวางให้เหมาะสมกับหน้าจอแท็บเล็ต
- **Mobile** (320px - 767px): เมนูแบบ hamburger และการจัดวางแบบ single column

## 🎯 คุณสมบัติที่พัฒนาแล้ว

- ✅ การออกแบบ UI/UX ที่ทันสมัย
- ✅ ระบบค้นหาเส้นทาง
- ✅ การเลือกที่นั่ง
- ✅ ฟอร์มข้อมูลผู้โดยสาร
- ✅ สรุปการจองและราคา
- ✅ Responsive design
- ✅ Navigation และ routing

## 🔮 คุณสมบัติที่จะพัฒนาต่อ

- 🔄 ระบบการชำระเงิน
- 🔄 ระบบสมาชิกและการล็อกอิน
- 🔄 ประวัติการจอง
- 🔄 การยืนยันการจองผ่านอีเมล
- 🔄 ระบบจัดการสำหรับผู้ดูแล
- 🔄 API สำหรับข้อมูลจริง

## 📦 คำสั่งที่สำคัญ

```bash
# รันโปรเจกต์ในโหมด development
npm run dev

# สร้าง build สำหรับ production
npm run build

# รันโปรเจกต์ในโหมด production
npm start

# ตรวจสอบ code style
npm run lint

# แก้ไข code style อัตโนมัติ
npm run lint:fix
```

## 🤝 การพัฒนาและการร่วมงาน

1. Fork โปรเจกต์
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📞 ติดต่อ

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถติดต่อได้ที่:

- 📧 Email: info@busticket.com
- 📱 Phone: 02-123-4567

## 📄 License

โปรเจกต์นี้เผยแพร่ภายใต้ MIT License - ดูรายละเอียดในไฟล์ [LICENSE](LICENSE)

---

สร้างด้วย ❤️ โดย [Your Name] | ขับเคลื่อนด้วย Next.js และ Tailwind CSS
# busgogo_phajay_client
