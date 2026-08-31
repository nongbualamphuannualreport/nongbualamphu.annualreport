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


## V1.4 — Production Homepage
- ปรับหน้าแรกเป็น Production Design
- ใช้ 6 เมนูตาม TOR
- Hero / KPI / Budget Dashboard / Strategy / Project / Download CTA
- Sticky Header ลดความสูงเมื่อ Scroll
- ปรับ Responsive สำหรับ PC / Tablet / Mobile
- พื้นที่ภาพโครงการใช้ Placeholder จนกว่าจะได้รับภาพจริงจากจังหวัด
- คง Interactive Map ในหน้า overview ไว้ แต่ไม่ให้แย่งลำดับความสำคัญจากหน้าแรก


## V1.5 — Modern Refresh
- ปรับโทนดีไซน์โดยรวมให้สดขึ้นและทันสมัยขึ้น
- Hero / card / section / button มี contrast และมิติมากขึ้น
- เพิ่ม modern highlight band บนหน้าแรก
- ใช้ gradient, glassmorphism เบา ๆ และ premium shadows
- คง Theme หนองบัวลำภูไว้ ไม่หลุดความเป็นเว็บไซต์ราชการ


## V1.6 — Bold Data Edition
- นำข้อมูลจริงจากเอกสาร 3 ไฟล์มาใส่ในหน้า Overview / Strategy / Results / Projects
- แก้จำนวนครัวเรือนเป็น 163,997 หลังคาเรือนตามข้อมูล ธ.ค. 2568
- เติมข้อมูลประชากรและพื้นที่ครบ 6 อำเภอใน Interactive Map
- เพิ่ม 5 ประเด็นการพัฒนา, 6 พันธกิจ, 3 ตัวชี้วัดเป้าหมาย
- เพิ่มผลลัพธ์จริง: 20 โรงเรียน/1,200 ราย, 80 กลุ่ม/>2 ล้านบาท, >5,000 คน, OTOP >11 ล้านบาท, ป่าไม้ 6 อำเภอ 12 ครั้ง
- เปลี่ยนดีไซน์เป็น Bold Editorial + Data Storytelling พร้อมใช้ภาพจริงจากแผนพัฒนาจังหวัด
