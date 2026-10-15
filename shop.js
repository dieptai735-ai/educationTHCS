/**
 * EduTHCS - Kịch bản Mua Khóa Học, Đề Thi, Ưu Đãi Giảm Giá
 * và Cơ Chế Thi Lại (Retake Exam) Dành Cho Học Sinh
 */

// ==========================================================
// 1. DANH MỤC KHÓA HỌC & ĐỀ THI ƯU ĐÃI (SHOP CATALOG DATA)
// ==========================================================
const SHOP_DATA = {
    courses: [
        {
            id: 'course_math_pro',
            type: 'course',
            category: 'courses',
            title: 'Khóa Bứt Phá Điểm 9+ Toán & KHTN Cấp 2',
            subtitle: 'Chinh phục toàn diện Đại Số, Hình Học và Khoa Học Tự Nhiên SGK mới',
            targetGrade: 'Khối 6, 7, 8, 9',
            subjectTag: 'Toán & KHTN',
            iconClass: 'icon-math',
            icon: 'fa-solid fa-calculator',
            originalPrice: 1200000,
            salePrice: 499000,
            discountPercent: 58,
            retakeTicketsGiven: 3, // TẶNG 3 LƯỢT THI LẠI PHÒNG THI THỨ 2
            features: [
                '120+ Video bài giảng trọng điểm bám sát đề thi',
                'Hơn 800 bài tập trắc nghiệm & tự luận kèm lời giải chi tiết',
                'Trợ giảng kèm cặp 1:1 giải đáp thắc mắc 24/7',
                'TẶNG 03 LƯỢT THI LẠI ĐỘC QUYỀN KỲ THI THỨ 2 (Cải thiện điểm & leo Top)'
            ],
            badgeLabel: 'HOT • BÁN CHẠY NHẤT'
        },
        {
            id: 'course_exam10_master',
            type: 'course',
            category: 'courses',
            title: 'Khóa Luyện Thi Tuyển Sinh Vào 10 Toàn Diện',
            subtitle: 'Chuyên đề quét sạch bẫy đề thi Toán - Văn - Anh vào các trường THPT Chuyên & Công Lập',
            targetGrade: 'Khối 9 Luyện Thi Vào 10',
            subjectTag: 'Tổng Hợp 3 Môn',
            iconClass: 'icon-exam',
            icon: 'fa-solid fa-graduation-cap',
            originalPrice: 1800000,
            salePrice: 799000,
            discountPercent: 55,
            retakeTicketsGiven: 5, // TẶNG 5 LƯỢT THI LẠI PHÒNG THI THỨ 2
            features: [
                '200+ Video giải đề thi thật các Sở GD Hà Nội, TP.HCM, Đà Nẵng...',
                'Bộ đề dự đoán ma trận ra đề năm 2026',
                'Chiến thuật làm bài đạt tối đa điểm trình bày tự luận',
                'TẶNG 05 LƯỢT THI LẠI VIP ĐỂ LEO TOP 1 BẢNG VÀNG THI ĐUA'
            ],
            badgeLabel: 'SIÊU VIP • VÀO 10'
        },
        {
            id: 'course_english_global',
            type: 'course',
            category: 'courses',
            title: 'Khóa Tiếng Anh Toàn Diện THCS Global Success',
            subtitle: 'Bứt phá điểm 10 Ngữ Pháp, Từ Vựng & Kỹ Năng Nghe Nói theo chương trình mới',
            targetGrade: 'Khối 6, 7, 8, 9',
            subjectTag: 'Tiếng Anh',
            iconClass: 'icon-english',
            icon: 'fa-solid fa-language',
            originalPrice: 950000,
            salePrice: 399000,
            discountPercent: 58,
            retakeTicketsGiven: 3, // TẶNG 3 LƯỢT THI LẠI
            features: [
                'Trọn bộ 24 chủ đề ngữ pháp & từ vựng trọng tâm THCS',
                'Kho 150 file nghe audio chuẩn giọng bản xứ Anh - Mỹ',
                'Phần mềm luyện phát âm AI tự động sửa lỗi sai',
                'TẶNG 03 LƯỢT THI LẠI BÀI THI KHẢO SÁT 00:00 THỨ 2'
            ],
            badgeLabel: 'ƯU ĐÃI TUẦN'
        }
    ],

    exams: [
        {
            id: 'exam_pack_midterm',
            type: 'exam',
            category: 'exams',
            title: 'Bộ 50 Đề Thi Giữa Kỳ & Cuối Kỳ Trọng Điểm THCS',
            subtitle: 'Tuyển tập đề thi chính thức từ các trường THCS chuyên và chuẩn quốc gia',
            targetGrade: 'Đầy đủ Khối 6, 7, 8, 9',
            subjectTag: 'Ngân Hàng Đề Thi',
            iconClass: 'icon-exam',
            icon: 'fa-solid fa-file-signature',
            originalPrice: 350000,
            salePrice: 149000,
            discountPercent: 57,
            retakeTicketsGiven: 1, // TẶNG 1 LƯỢT THI LẠI
            features: [
                '50 đề thi đầy đủ 4 môn Toán, Văn, Anh, KHTN',
                'Có ma trận đề thi & barem chấm điểm chi tiết từng câu',
                'Tải trọn bộ file PDF chất lượng cao in trực tiếp',
                'TẶNG KÈM 01 LƯỢT THI LẠI PHÒNG THI TRỰC TUYẾN'
            ],
            badgeLabel: 'TIẾT KIỆM'
        },
        {
            id: 'exam_pack_chuyen10',
            type: 'exam',
            category: 'exams',
            title: 'Tuyển Tập 100 Đề Thi Tuyển Sinh Vào 10 Chuyên & CLC',
            subtitle: 'Đề thi chọn lọc trường Chuyên Amsterdam, Lam Sơn, Lê Hồng Phong, Quốc Học Huế...',
            targetGrade: 'Khối 9 Chuyên Sâu',
            subjectTag: 'Đề Thi Chuyên',
            iconClass: 'icon-science',
            icon: 'fa-solid fa-trophy',
            originalPrice: 450000,
            salePrice: 199000,
            discountPercent: 56,
            retakeTicketsGiven: 2, // TẶNG 2 LƯỢT THI LẠI
            features: [
                '100 đề thi chuyên có phân tích bẫy đề thi kinh điển',
                'Mẹo giải nhanh các câu phân loại điểm 9 và 10',
                'Video hướng dẫn giải chi tiết 30 bài toán hình học khó',
                'TẶNG KÈM 02 LƯỢT THI LẠI NÂNG CAO THỨ HẠNG'
            ],
            badgeLabel: 'ĐỀ THI ĐỈNH CAO'
        },
        {
            id: 'exam_pack_weekly_pass',
            type: 'exam',
            category: 'exams',
            title: 'Gói Đặc Quyền Luyện Thi & Thi Lại Không Giới Hạn',
            subtitle: 'Mở khóa đặc quyền thi lại và tra cứu kho đáp án giải mã kỳ thi hàng tuần',
            targetGrade: 'Toàn Bộ Cấp 2',
            subjectTag: 'Đặc Quyền Khảo Thí',
            iconClass: 'icon-math',
            icon: 'fa-solid fa-rotate-left',
            originalPrice: 250000,
            salePrice: 99000,
            discountPercent: 60,
            retakeTicketsGiven: 3, // TẶNG 3 LƯỢT THI LẠI
            features: [
                'Mở khóa ngay 03 LƯỢT THI LẠI bài thi 00:00 Thứ 2',
                'Xem đáp án video giải thích chi tiết trước khi nộp lại',
                'Bảo lưu điểm cao nhất lên Bảng Xếp Hạng tuần',
                'Hỗ trợ hỏi đáp cùng thầy cô giám thị khảo thí'
            ],
            badgeLabel: 'HOT NHẤT CHO KỲ THI'
        }
    ],

    combos: [
        {
            id: 'combo_all_in_one',
            type: 'combo',
            category: 'combos',
            title: 'Combo Toàn Diện: VIP Khóa Học + 150 Bộ Đề Thi',
            subtitle: 'Trọn gói học tập và thi thử cấp 2 không giới hạn từ nay đến hết năm học',
            targetGrade: 'Trọn bộ Khối 6 - 9',
            subjectTag: 'Gói Siêu Tiết Kiệm',
            iconClass: 'icon-exam',
            icon: 'fa-solid fa-crown',
            originalPrice: 2500000,
            salePrice: 999000,
            discountPercent: 60,
            retakeTicketsGiven: 10, // TẶNG 10 LƯỢT THI LẠI
            features: [
                'Truy cập TẤT CẢ các khóa học Toán, Văn, Anh, KHTN',
                'Tải không giới hạn 150+ bộ đề thi có giải chi tiết',
                'TẶNG ĐẶC BIỆT 10 LƯỢT THI LẠI PHÒNG THI TRỰC TUYẾN',
                'Cam kết tiến bộ vượt bậc sau 30 ngày học'
            ],
            badgeLabel: 'GIẢM SỐC 60%'
        }
    ]
};

// ==========================================================
// 2. QUẢN LÝ LƯỢT THI LẠI (RETAKE TICKETS MANAGER)
// ==========================================================
const RETAKE_STORAGE_KEY = 'eduthcs_retake_tickets';
const PURCHASES_STORAGE_KEY = 'eduthcs_purchased_courses';

/**
 * Lấy số lượng lượt thi lại hiện có của thí sinh
 */
function getRetakeTickets() {
    const raw = localStorage.getItem(RETAKE_STORAGE_KEY);
    if (raw === null) {
        // Mặc định ban đầu chưa mua khóa học: 0 lượt
        return 0;
    }
    const count = parseInt(raw, 10);
    return isNaN(count) ? 0 : count;
}

/**
 * Cập nhật số lượng lượt thi lại
 */
function setRetakeTickets(count) {
    localStorage.setItem(RETAKE_STORAGE_KEY, Math.max(0, count));
}

/**
 * Thêm lượt thi lại khi mua khóa học
 */
function addRetakeTickets(amount) {
    const current = getRetakeTickets();
    const updated = current + amount;
    setRetakeTickets(updated);
    return updated;
}

/**
 * Lấy danh sách khóa học / gói đề thi đã mua
 */
function getPurchasedItems() {
    const raw = localStorage.getItem(PURCHASES_STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function savePurchasedItem(item) {
    const list = getPurchasedItems();
    list.push({
        id: item.id,
        title: item.title,
        pricePaid: item.salePrice,
        retakeTicketsGiven: item.retakeTicketsGiven,
        purchasedAt: new Date().toLocaleString()
    });
    localStorage.setItem(PURCHASES_STORAGE_KEY, JSON.stringify(list));
}

// ==========================================================
// 3. KHỞI TẠO ĐỒNG HỒ FLASH SALE ĐẾM NGƯỢC
// ==========================================================
let flashSaleInterval = null;

function initFlashSaleTimer() {
    const dElem = document.getElementById('flashDays');
    const hElem = document.getElementById('flashHours');
    const mElem = document.getElementById('flashMinutes');
    const sElem = document.getElementById('flashSeconds');

    if (!dElem && !hElem) return;

    // Thời điểm kết thúc Flash Sale (3 ngày tới kể từ bây giờ)
    let endTime = localStorage.getItem('eduthcs_flashsale_endtime');
    if (!endTime) {
        const now = new Date();
        const end = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000));
        endTime = end.getTime();
        localStorage.setItem('eduthcs_flashsale_endtime', endTime);
    } else {
        endTime = parseInt(endTime, 10);
    }

    function update() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
            // Tự động gia hạn flash sale chu kỳ mới
            const newEnd = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
            localStorage.setItem('eduthcs_flashsale_endtime', newEnd);
            endTime = newEnd;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (dElem) dElem.innerText = days < 10 ? '0' + days : days;
        if (hElem) hElem.innerText = hours < 10 ? '0' + hours : hours;
        if (mElem) mElem.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (sElem) sElem.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    update();
    clearInterval(flashSaleInterval);
    flashSaleInterval = setInterval(update, 1000);
}

// ==========================================================
// 4. RENDER CÁC SẢN PHẨM KHÓA HỌC & ĐỀ THI
// ==========================================================
let currentShopTab = 'courses';

function renderShopProducts(tab = 'courses') {
    currentShopTab = tab;
    const container = document.getElementById('shopProductsGrid');
    if (!container) return;

    // Cập nhật tab active
    const tabButtons = document.querySelectorAll('.shop-tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    let items = [];
    if (tab === 'courses') items = SHOP_DATA.courses;
    else if (tab === 'exams') items = SHOP_DATA.exams;
    else if (tab === 'combos') items = SHOP_DATA.combos;
    else items = [...SHOP_DATA.courses, ...SHOP_DATA.exams, ...SHOP_DATA.combos];

    let html = '';
    items.forEach(item => {
        const isFeatured = item.type === 'course' ? 'featured-course' : '';
        const retakeBadgeText = `🎁 Tặng ${item.retakeTicketsGiven} lượt thi lại phòng thi Thứ 2`;

        let featuresHtml = '';
        item.features.forEach(f => {
            const isRetakeHighlight = f.includes('LƯỢT THI LẠI');
            const liClass = isRetakeHighlight ? 'highlight-retake' : '';
            const icon = isRetakeHighlight ? 'fa-solid fa-crown' : 'fa-solid fa-circle-check';
            featuresHtml += `<li class="${liClass}"><i class="${icon}"></i> <span>${f}</span></li>`;
        });

        const formattedSalePrice = item.salePrice.toLocaleString('vi-VN') + 'đ';
        const formattedOldPrice = item.originalPrice.toLocaleString('vi-VN') + 'đ';

        html += `
            <div class="shop-card ${isFeatured}">
                <div class="shop-card-head">
                    <span class="discount-badge-corner">-${item.discountPercent}%</span>
                    <div class="shop-card-icon ${item.iconClass}">
                        <i class="${item.icon}"></i>
                    </div>
                    <span class="course-target-tag">${item.targetGrade}</span>
                    <h3 class="shop-card-title">${item.title}</h3>
                    <p class="shop-card-subtitle">${item.subtitle}</p>
                </div>

                <!-- ĐẶC QUYỀN THI LẠI TRONG KHÓA HỌC -->
                <div class="retake-privilege-badge">
                    <i class="fa-solid fa-rotate-left"></i>
                    <div>
                        <strong>Cơ Hội Thi Lại:</strong> Được tặng ngay <strong>${item.retakeTicketsGiven} lượt thi lại</strong> để cải thiện điểm số và thứ hạng!
                    </div>
                </div>

                <div class="shop-card-body">
                    <ul class="features-list">
                        ${featuresHtml}
                    </ul>
                </div>

                <div class="shop-card-footer">
                    <div class="price-row">
                        <span class="current-price">${formattedSalePrice}</span>
                        <span class="old-price">${formattedOldPrice}</span>
                        <span class="save-percent-pill">Tiết kiệm ${item.discountPercent}%</span>
                    </div>
                    <div class="shop-action-buttons">
                        <button type="button" class="btn-buy-now shadow-pulse" onclick="openCheckoutModal('${item.id}')">
                            <i class="fa-solid fa-bolt"></i> Đăng Ký Ngay (Nhận ${item.retakeTicketsGiven} Lượt Thi Lại)
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================================
// 5. MODAL THANH TOÁN & KÍCH HOẠT NHẬN LƯỢT THI LẠI
// ==========================================================
let currentCheckoutItem = null;
let appliedDiscount = 0; // Giảm giá thêm từ Coupon

function openCheckoutModal(itemId) {
    let item = null;
    const all = [...SHOP_DATA.courses, ...SHOP_DATA.exams, ...SHOP_DATA.combos];
    item = all.find(x => x.id === itemId);

    if (!item) {
        item = SHOP_DATA.courses[0]; // Mặc định khóa học 1
    }

    currentCheckoutItem = item;
    appliedDiscount = 0;

    const modal = document.getElementById('courseCheckoutModal');
    if (!modal) return;

    // Nạp dữ liệu vào modal
    const titleElem = document.getElementById('checkoutItemTitle');
    const badgeElem = document.getElementById('checkoutItemBadge');
    const bonusElem = document.getElementById('checkoutItemBonus');
    const origPriceElem = document.getElementById('checkoutOriginalPrice');
    const salePriceElem = document.getElementById('checkoutSalePrice');
    const couponDiscountRow = document.getElementById('checkoutCouponRow');
    const finalPriceElem = document.getElementById('checkoutFinalPrice');
    const qrPriceElem = document.getElementById('checkoutQrAmount');

    if (titleElem) titleElem.innerText = item.title;
    if (badgeElem) badgeElem.innerText = item.subjectTag;
    if (bonusElem) bonusElem.innerHTML = `<i class="fa-solid fa-gift text-green"></i> <strong>ĐẶC QUYỀN VIP:</strong> Tặng <strong>${item.retakeTicketsGiven} lượt thi lại</strong> bài thi 00:00 Thứ 2 ngay sau khi kích hoạt!`;
    if (origPriceElem) origPriceElem.innerText = item.originalPrice.toLocaleString('vi-VN') + 'đ';
    if (salePriceElem) salePriceElem.innerText = item.salePrice.toLocaleString('vi-VN') + 'đ';
    if (couponDiscountRow) couponDiscountRow.style.display = 'none';
    if (finalPriceElem) finalPriceElem.innerText = item.salePrice.toLocaleString('vi-VN') + 'đ';
    if (qrPriceElem) qrPriceElem.innerText = item.salePrice.toLocaleString('vi-VN') + 'đ';

    modal.classList.add('active');
}

function closeCheckoutModal() {
    const modal = document.getElementById('courseCheckoutModal');
    if (modal) modal.classList.remove('active');
}

/**
 * Áp dụng mã giảm giá
 */
function applyShopCoupon() {
    const input = document.getElementById('couponCodeInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();

    if (!code) {
        if (typeof showToast === 'function') showToast('Vui lòng nhập mã giảm giá!', 'error');
        return;
    }

    if (code === 'EDUVIP' || code === 'GIAM10' || code === 'THCS50') {
        appliedDiscount = 50000; // Giảm thêm 50k
        const couponRow = document.getElementById('checkoutCouponRow');
        const couponVal = document.getElementById('checkoutCouponVal');
        const finalPriceElem = document.getElementById('checkoutFinalPrice');
        const qrPriceElem = document.getElementById('checkoutQrAmount');

        if (couponRow) couponRow.style.display = 'flex';
        if (couponVal) couponVal.innerText = '-50.000đ';

        const finalAmount = Math.max(0, currentCheckoutItem.salePrice - appliedDiscount);
        if (finalPriceElem) finalPriceElem.innerText = finalAmount.toLocaleString('vi-VN') + 'đ';
        if (qrPriceElem) qrPriceElem.innerText = finalAmount.toLocaleString('vi-VN') + 'đ';

        if (typeof showToast === 'function') {
            showToast(`🎉 Áp dụng mã ${code} thành công! Giảm thêm 50.000đ.`, 'success');
        }
    } else {
        if (typeof showToast === 'function') {
            showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn! Thử mã: EDUVIP', 'error');
        }
    }
}

/**
 * Chọn phương thức thanh toán
 */
function selectPaymentMethod(element) {
    const items = document.querySelectorAll('.payment-method-item');
    items.forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
}

/**
 * XÁC NHẬN THANH TOÁN & KÍCH HOẠT KHÓA HỌC + CỘNG LƯỢT THI LẠI
 */
function confirmCheckoutAndActivate() {
    if (!currentCheckoutItem) return;

    // 1. Lưu khóa học đã mua
    savePurchasedItem(currentCheckoutItem);

    // 2. CỘNG LƯỢT THI LẠI VÀO TÀI KHOẢN
    const ticketsAdded = currentCheckoutItem.retakeTicketsGiven || 3;
    const totalTickets = addRetakeTickets(ticketsAdded);

    closeCheckoutModal();

    // 3. Thông báo chúc mừng
    const message = `🎉 CHÚC MỪNG! Bạn đã kích hoạt thành công: "${currentCheckoutItem.title}".\nBạn nhận được ${ticketsAdded} LƯỢT THI LẠI VIP (Tổng cộng: ${totalTickets} lượt)!`;
    alert(message);

    if (typeof showToast === 'function') {
        showToast(`🎉 Đã cộng ${ticketsAdded} lượt thi lại VIP vào tài khoản!`, 'success');
    }

    // 4. Nếu đang ở trang thi (exam.html), cập nhật giao diện thi lại
    if (typeof renderRetakeBoxOnLockedScreen === 'function') {
        renderRetakeBoxOnLockedScreen();
    }
}

// ==========================================================
// 6. TÍCH HỢP ĐẶC QUYỀN THI LẠI TRÊN PHÒNG THI (EXAM.HTML)
// ==========================================================

/**
 * Render khối đặc quyền thi lại trên màn hình Khóa của phòng thi
 */
function renderRetakeBoxOnLockedScreen() {
    const container = document.getElementById('vipRetakeSection');
    if (!container) return;

    const tickets = getRetakeTickets();

    if (tickets > 0) {
        // TRƯỜNG HỢP: ĐÃ CÓ LƯỢT THI LẠI
        container.innerHTML = `
            <div class="has-retake-ticket-card">
                <div class="retake-left-info">
                    <div class="ticket-icon-wrap">
                        <i class="fa-solid fa-award"></i>
                    </div>
                    <div>
                        <h3>🎯 ĐẶC QUYỀN VIP: BẠN ĐANG CÓ ${tickets} LƯỢT THI LẠI!</h3>
                        <p>Nhờ đã đăng ký Khóa học EduTHCS VIP, bạn được quyền làm lại bài thi để cải thiện điểm số và thăng hạng lên Top 1 Bảng Vàng!</p>
                    </div>
                </div>
                <button type="button" class="btn-use-retake shadow-pulse" onclick="executeVipRetake()">
                    <i class="fa-solid fa-rotate-left"></i> Sử Dụng 01 Lượt Thi Lại (Còn ${tickets} lượt)
                </button>
            </div>
        `;
    } else {
        // TRƯỜNG HỢP: CHƯA CÓ LƯỢT THI LẠI (QUẢNG BÁ KHÓA HỌC)
        container.innerHTML = `
            <div class="no-retake-ticket-card">
                <div class="promo-retake-left">
                    <div class="gift-icon-wrap">
                        <i class="fa-solid fa-gift"></i>
                    </div>
                    <div>
                        <h3>🎁 MUỐN CẢI THIỆN ĐIỂM SỐ & THỨ HẠNG?</h3>
                        <p>Quy chế quy định chỉ thi 1 lần. Nhưng khi đăng ký <strong>Khóa Học VIP</strong> hôm nay (Đang giảm 55%), bạn được <strong>TẶNG NGAY 03 LƯỢT THI LẠI</strong> để bứt phá điểm 10!</p>
                    </div>
                </div>
                <button type="button" class="btn-unlock-retake shadow-pulse" onclick="openCheckoutModal('course_math_pro')">
                    <i class="fa-solid fa-cart-shopping"></i> Mua Khóa Học Để Mở Khóa Thi Lại Ngay (-58%)
                </button>
            </div>
        `;
    }
}

/**
 * SỬ DỤNG 01 LƯỢT THI LẠI VIP ĐỂ BẮT ĐẦU LÀM LẠI BÀI THI
 */
function executeVipRetake() {
    const tickets = getRetakeTickets();
    if (tickets <= 0) {
        alert("Bạn đã dùng hết lượt thi lại. Hãy đăng ký thêm Khóa học VIP để nhận thêm lượt!");
        openCheckoutModal('course_math_pro');
        return;
    }

    const confirmRetake = confirm(
        `🎯 XÁC NHẬN SỬ DỤNG LƯỢT THI LẠI VIP:\n` +
        `Bạn đang có ${tickets} lượt thi lại.\n` +
        `Hệ thống sẽ trừ 01 lượt thi và mở lại phòng thi để bạn làm lại bài.\n` +
        `Điểm số mới nhất sẽ được ghi nhận và cập nhật trực tiếp lên Bảng Xếp Hạng.\n\n` +
        `Bạn đã sẵn sàng thi lại chưa?`
    );

    if (!confirmRetake) return;

    // Trừ 1 lượt thi
    const remaining = addRetakeTickets(-1);

    // Xóa cờ bài thi đã làm trong localStorage
    localStorage.removeItem(`eduthcs_submission_${EXAM_ID}`);

    // Reset trạng thái làm bài thi
    if (typeof userAnswers !== 'undefined') userAnswers = {};
    if (typeof flaggedQuestions !== 'undefined' && flaggedQuestions.clear) flaggedQuestions.clear();
    if (typeof tabSwitchViolations !== 'undefined') tabSwitchViolations = 0;
    if (typeof examCountdownSeconds !== 'undefined') examCountdownSeconds = EXAM_DURATION_MINUTES * 60;

    if (typeof showToast === 'function') {
        showToast(`🚀 Đã mở khóa thi lại thành công! Bạn còn ${remaining} lượt thi lại VIP.`, 'success');
    }

    // Bắt đầu làm bài thi
    if (typeof showExamScreen === 'function') {
        showExamScreen();
    } else {
        window.location.reload();
    }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    initFlashSaleTimer();
    renderShopProducts('courses');
    renderRetakeBoxOnLockedScreen();
});
