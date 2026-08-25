# Digital Annual Report จังหวัดหนองบัวลำภู — V1

ต้นแบบสำหรับเริ่มพัฒนาเว็บไซต์จริงตามโครง TOR โดยมี 6 เมนูหลัก

1. หน้าหลัก
2. ข้อมูลทั่วไปจังหวัดหนองบัวลำภู
3. ยุทธศาสตร์จังหวัดหนองบัวลำภู
4. ผลการดำเนินงานและการใช้จ่ายงบประมาณ
5. ผลการดำเนินงานโครงการสำคัญ
6. ดาวน์โหลดรายงาน

## V1 นี้มี
- Responsive สำหรับ PC / Tablet / Mobile
- Sticky navigation
- Scroll reveal และ Count-up animation
- Dashboard / Graph
- Interactive Map 6 อำเภอแบบ Schematic เพื่อทดสอบ Hover/Click/Tap
- ไม่สร้างตัวเลขรายอำเภอที่ยังไม่มีข้อมูล
- Static Site ไม่มีฐานข้อมูลและไม่มี CMS
- พร้อมอัป GitHub และ Deploy บน Vercel

## Interactive Map
แผนที่ V1 เป็นเพียงโครงเชิงสัญลักษณ์ (not to scale) เมื่อได้รับไฟล์แผนที่เขตอำเภอจริง เช่น SVG/GeoJSON สามารถแทน geometry เดิมได้โดยไม่ต้องเปลี่ยน Interaction หลัก

## Deploy บน Vercel
Framework Preset: Other
Build Command: เว้นว่าง
Output Directory: ./


## V1.2 Complete
- รวมโครงสร้างกลับมาใช้ Master แบบ `assets/...` ชุดเดียว
- ใส่ตราจังหวัดหนองบัวลำภูใน Header/Footer
- ปรับ Interactive Map ให้เป็นรูปทรงจังหวัดตามภาพอ้างอิงที่ผู้ว่าจ้างจัดส่ง
- แยก 6 อำเภอ และคง Hover / Click / Tap Interaction
- ไม่มีการสร้างตัวเลขรายอำเภอที่ยังไม่ได้รับข้อมูลจริง


## V1.3 Favicon
- ใช้ตราจังหวัดหนองบัวลำภูเป็น Favicon
- มี `favicon.ico`, PNG 32/48px และ Apple Touch Icon 180px
