/**
 * EduTHCS - Kịch bản Phòng Thi Trực Tuyến Cấp 2
 * Quy tắc: Bắt đầu từ 00:00am Thứ 2 - Lưu ý: ĐÃ THI KHÔNG THỂ THI LẠI
 */

// ==========================================================
// 1. NGÂN HÀNG CÂU HỎI ĐỀ THI KHẢO SÁT NĂNG LỰC CẤP 2 (15 CÂU)
// ==========================================================
const examQuestions = [
    {
        id: 1,
        subject: "Toán Học",
        question: "Căn bậc hai số học của số 81 là:",
        options: ["A. 9", "B. -9", "C. ±9", "D. 81"],
        correct: 0,
        explanation: "Căn bậc hai số học của một số dương a là số không âm x sao cho x² = a. Vì 9 > 0 và 9² = 81 nên căn bậc hai số học của 81 là 9."
    },
    {
        id: 2,
        subject: "Toán Học",
        question: "Biểu thức √(2x - 6) có nghĩa (xác định) khi và chỉ khi:",
        options: ["A. x ≥ 3", "B. x ≤ 3", "C. x > 3", "D. x < 3"],
        correct: 0,
        explanation: "Biểu thức căn thức bậc hai √A có nghĩa khi A ≥ 0. Ta có: 2x - 6 ≥ 0 ⇔ 2x ≥ 6 ⇔ x ≥ 3."
    },
    {
        id: 3,
        subject: "Toán Học",
        question: "Hằng đẳng thức nào sau đây được viết ĐÚNG?",
        options: [
            "A. (a - b)² = a² - b²",
            "B. (a + b)² = a² + 2ab + b²",
            "C. a² - b² = (a - b)³",
            "D. (a + b)³ = a³ + b³"
        ],
        correct: 1,
        explanation: "Hằng đẳng thức bình phương của một tổng chuẩn xác là: (a + b)² = a² + 2ab + b²."
    },
    {
        id: 4,
        subject: "Toán Học",
        question: "Tam giác ABC vuông tại A có đường cao AH. Hệ thức lượng nào sau đây là ĐÚNG?",
        options: [
            "A. AH² = HB . HC",
            "B. AB² = AH . BC",
            "C. AC² = HB . HC",
            "D. AH . BC = AB² + AC²"
        ],
        correct: 0,
        explanation: "Theo hệ thức lượng trong tam giác vuông: Bình phương đường cao ứng với cạnh huyền bằng tích hai hình chiếu của hai cạnh góc vuông trên cạnh huyền (AH² = HB . HC)."
    },
    {
        id: 5,
        subject: "Ngữ Văn",
        question: "Tác phẩm 'Lặng lẽ Sa Pa' của tác giả Nguyễn Thành Long khắc họa vẻ đẹp của nhân vật nào làm trọng tâm?",
        options: [
            "A. Ông họa sĩ già",
            "B. Cô kỹ sư nông nghiệp",
            "C. Bác lái xe",
            "D. Anh thanh niên làm công tác khí tượng"
        ],
        correct: 3,
        explanation: "Nhân vật anh thanh niên 27 tuổi một mình trên đỉnh Yên Sơn cao 2600m làm công tác khí tượng kiêm vật lý địa cầu là hình tượng trung tâm cống hiến thầm lặng cho đất nước."
    },
    {
        id: 6,
        subject: "Ngữ Văn",
        question: "Biện pháp tu từ nào được sử dụng trong câu thơ: 'Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, em nằm trên lưng'?",
        options: ["A. Ẩn dụ", "B. Hoán dụ", "C. Điệp ngữ và Ẩn dụ", "D. Nhân hóa"],
        correct: 2,
        explanation: "'Mặt trời của mẹ' là hình ảnh ẩn dụ cho người con, kết hợp phép điệp từ 'Mặt trời' thể hiện tình yêu thương thiêng liêng vô bờ bến của người mẹ Tà-ôi."
    },
    {
        id: 7,
        subject: "Tiếng Anh",
        question: "Choose the best answer: 'If we ______ hard today, we will pass the entrance examination to grade 10.'",
        options: ["A. study", "B. studied", "C. will study", "D. had studied"],
        correct: 0,
        explanation: "Đây là câu điều kiện loại 1 (Conditional Sentence Type 1): Mệnh đề If dùng ở thì Hiện tại đơn (study), mệnh đề chính dùng will + V-nguyên thể."
    },
    {
        id: 8,
        subject: "Tiếng Anh",
        question: "Identify the word with the underlined part pronounced differently from the others: ",
        options: ["A. look<u>ed</u>", "B. watch<u>ed</u>", "C. play<u>ed</u>", "D. stopp<u>ed</u>"],
        correct: 2,
        explanation: "Từ 'played' có đuôi -ed phát âm là /d/ (sau âm nguyên âm). Các từ looked, watched, stopped có đuôi -ed phát âm là /t/ (sau âm vô thanh /k/, /tʃ/, /p/)."
    },
    {
        id: 9,
        subject: "Tiếng Anh",
        question: "She asked me: 'Where do you live?' -> She asked me where ______.",
        options: ["A. I lived", "B. do I live", "C. did I live", "D. I live"],
        correct: 0,
        explanation: "Trong câu tường thuật gián tiếp dạng câu hỏi Wh-question, trật tự từ đổi thành câu trần thuật (S + V) và lùi thì từ Hiện tại đơn sang Quá khứ đơn (where I lived)."
    },
    {
        id: 10,
        subject: "KHTN (Vật Lý)",
        question: "Một vật chuyển động thẳng đều với vận tốc v = 15 m/s. Quãng đường vật đi được trong thời gian t = 20 giây là:",
        options: ["A. 150 m", "B. 300 m", "C. 450 m", "D. 35 m"],
        correct: 1,
        explanation: "Công thức tính quãng đường trong chuyển động thẳng đều: s = v . t = 15 . 20 = 300 (m)."
    },
    {
        id: 11,
        subject: "KHTN (Hóa Học)",
        question: "Hợp chất nào sau đây thuộc loại Axit?",
        options: ["A. NaOH", "B. CaO", "C. HCl", "D. NaCl"],
        correct: 2,
        explanation: "HCl (Axit clohidric) phân li ra ion H+ trong dung dịch nên là một axit. NaOH là bazơ, CaO là oxit bazơ, NaCl là muối."
    },
    {
        id: 12,
        subject: "KHTN (Hóa Học)",
        question: "Phương trình hóa học nào sau đây đã được cân bằng ĐÚNG?",
        options: [
            "A. 2H₂ + O₂ → 2H₂O",
            "B. H₂ + O₂ → H₂O",
            "C. 2Fe + 3Cl₂ → FeCl₃",
            "D. Al + O₂ → Al₂O₃"
        ],
        correct: 0,
        explanation: "Phương trình 2H₂ + O₂ → 2H₂O có số nguyên tử H ở 2 vế là 4, số nguyên tử O ở 2 vế là 2, thỏa mãn định luật bảo toàn khối lượng."
    },
    {
        id: 13,
        subject: "KHTN (Sinh Học)",
        question: "Cơ quan nào trong cơ thể người chịu trách nhiệm bơm máu đi khắp cơ thể?",
        options: ["A. Phổi", "B. Dạ dày", "C. Gan", "D. Tim"],
        correct: 3,
        explanation: "Tim là cơ quan cơ rỗng hoạt động như một chiếc máy bơm nhịp nhàng co bóp để đẩy máu giàu oxy và dưỡng chất đi nuôi khắp cơ thể."
    },
    {
        id: 14,
        subject: "Lịch Sử & Địa Lý",
        question: "Chiến dịch Điện Biên Phủ toàn thắng vào mốc lịch sử nào?",
        options: ["A. 07/05/1954", "B. 02/09/1945", "C. 30/04/1975", "D. 19/12/1946"],
        correct: 0,
        explanation: "Ngày 07/05/1954, lá cờ 'Quyết chiến Quyết thắng' của Quân đội nhân dân Việt Nam tung bay trên nóc hầm tướng Đờ Cát-xtơ-ri, đánh dấu thắng lợi Điện Biên Phủ vang dội năm châu."
    },
    {
        id: 15,
        subject: "Tin Học",
        question: "Trong lập trình Python, hàm nào dùng để in dữ liệu hiển thị ra màn hình?",
        options: ["A. input()", "B. print()", "C. output()", "D. scan()"],
        correct: 1,
        explanation: "Hàm print() trong ngôn ngữ lập trình Python được dùng để xuất dữ liệu, chuỗi hoặc kết quả tính toán ra màn hình console."
    }
];

// ==========================================================
// 2. BIẾN TRẠNG THÁI PHÒNG THI (EXAM STATE)
// ==========================================================
const EXAM_ID = 'weekly_exam_monday_00am';
const EXAM_DURATION_MINUTES = 45;

let currentQuestionIndex = 0;
let userAnswers = {}; // { questionId: selectedOptionIndex }
let flaggedQuestions = new Set();
let examCountdownSeconds = EXAM_DURATION_MINUTES * 60;
let examTimerInterval = null;
let mondayCountdownInterval = null;
let tabSwitchViolations = 0;
let simulateOpenMode = true; // Cho phép trải nghiệm phòng thi ngay

// ==========================================================
// 3. KHỞI TẠO HỆ THỐNG KHI TẢI TRANG
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    initCandidateProfile();
    initExamState();
    setupTabSwitchDetection();
});

function initCandidateProfile() {
    const rawUser = localStorage.getItem('eduthcs_user');
    let candidateName = 'Học sinh demo';
    let sbd = 'THCS-DEMO';

    if (rawUser) {
        try {
            const user = JSON.parse(rawUser);
            if (user && user.fullName) {
                candidateName = user.fullName;
                sbd = user.role === 'student' ? 'THCS-' + (user.username || '9A1') : 'GV-KHAOTHI';
            }
        } catch (e) {}
    }

    // Gán thông tin lên giao diện
    const candidateNameElem = document.getElementById('candidateName');
    const candidateSBDElem = document.getElementById('candidateSBD');
    const sidebarCandidateName = document.getElementById('sidebarCandidateName');
    const lockCandidateName = document.getElementById('lockCandidateName');

    if (candidateNameElem) candidateNameElem.innerText = candidateName;
    if (candidateSBDElem) candidateSBDElem.innerText = `SBD: ${sbd}`;
    if (sidebarCandidateName) sidebarCandidateName.innerText = candidateName;
    if (lockCandidateName) lockCandidateName.innerText = `${candidateName} (SBD: ${sbd})`;
}

/**
 * Kiểm tra trạng thái kỳ thi:
 * 1. Nếu ĐÃ THI -> Mở màn hình KHÓA (KHÔNG THỂ THI LẠI)
 * 2. Nếu CHƯA ĐẾN 00:00 THỨ 2 và không bật simulate -> Màn hình CHỜ ĐẾM NGƯỢC
 * 3. Nếu ĐÃ ĐẾN GIỜ THI -> Màn hình LÀM BÀI
 */
function initExamState() {
    const submission = getExamSubmission();

    // KIỂM TRA ĐÃ THI: ĐÃ THI KHÔNG THỂ THI LẠI
    if (submission) {
        showLockedScreen(submission);
        return;
    }

    // Kiểm tra thời gian 00:00 Thứ Hai
    const isMondayExamOpen = checkIsMondayExamOpen();

    if (isMondayExamOpen || simulateOpenMode) {
        showExamScreen();
    } else {
        showWaitingScreen();
    }
}

// ==========================================================
// 4. KIỂM TRA THỜI GIAN: 00:00 AM THỨ 2
// ==========================================================
function checkIsMondayExamOpen() {
    const now = new Date();
    // 0 = Chủ Nhật, 1 = Thứ Hai, 2 = Thứ Ba, 3 = Thứ Tư, 4 = Thứ Năm, 5 = Thứ Sáu, 6 = Thứ Bảy
    const day = now.getDay();
    
    // Nếu hôm nay là Thứ Hai (day === 1) từ 00:00 trở đi -> Đang mở thi
    if (day === 1) {
        return true;
    }
    return false;
}

/**
 * Tính ngày Thứ Hai tiếp theo lúc 00:00:00
 */
function getNextMondayDate() {
    const now = new Date();
    const resultDate = new Date(now);
    const day = now.getDay();
    
    // Số ngày cần cộng để tới Thứ Hai tiếp theo
    let daysUntilMonday = 0;
    if (day === 0) {
        daysUntilMonday = 1; // Chủ nhật -> Thứ 2 là ngày mai
    } else if (day === 1) {
        // Nếu là thứ 2 nhưng muốn tính thứ 2 tuần sau
        daysUntilMonday = 7;
    } else {
        daysUntilMonday = 8 - day; // Thứ 2: +7, Thứ 3: +6, Thứ 4: +5...
    }

    resultDate.setDate(now.getDate() + daysUntilMonday);
    resultDate.setHours(0, 0, 0, 0); // 00:00:00 AM
    return resultDate;
}

function startMondayCountdown() {
    clearInterval(mondayCountdownInterval);
    const targetMonday = getNextMondayDate();

    // Hiển thị ngày cụ thể lên giao diện
    const displayNextMonday = document.getElementById('nextMondayDisplay');
    if (displayNextMonday) {
        const d = targetMonday.getDate();
        const m = targetMonday.getMonth() + 1;
        const y = targetMonday.getFullYear();
        displayNextMonday.innerText = `00:00 AM Thứ Hai, ${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
    }

    function updateTick() {
        const now = new Date().getTime();
        const distance = targetMonday.getTime() - now;

        if (distance <= 0) {
            clearInterval(mondayCountdownInterval);
            initExamState();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dElem = document.getElementById('countDays');
        const hElem = document.getElementById('countHours');
        const mElem = document.getElementById('countMinutes');
        const sElem = document.getElementById('countSeconds');

        if (dElem) dElem.innerText = days < 10 ? '0' + days : days;
        if (hElem) hElem.innerText = hours < 10 ? '0' + hours : hours;
        if (mElem) mElem.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (sElem) sElem.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTick();
    mondayCountdownInterval = setInterval(updateTick, 1000);
}

// Bật/tắt chế độ thử nghiệm phòng thi
function toggleSimulateOpen() {
    simulateOpenMode = !simulateOpenMode;
    const btn = document.getElementById('btnToggleSimulateTime');
    const text = document.getElementById('simulateStatusText');

    if (simulateOpenMode) {
        if (btn) btn.classList.add('active');
        if (text) text.innerText = 'Đang Mở Phòng Thi';
        showToast('Đã kích hoạt chế độ: Đang trong giờ thi (Mở lúc 00:00 Thứ 2)', 'info');
    } else {
        if (btn) btn.classList.remove('active');
        if (text) text.innerText = 'Đang Đóng (Chờ Thứ 2)';
        showToast('Đã chuyển sang chế độ thời gian thực: Đếm ngược tới 00:00 Thứ 2', 'info');
    }

    initExamState();
}

function forceOpenExamForTesting() {
    simulateOpenMode = true;
    const btn = document.getElementById('btnToggleSimulateTime');
    const text = document.getElementById('simulateStatusText');
    if (btn) btn.classList.add('active');
    if (text) text.innerText = 'Đang Mở Phòng Thi';
    initExamState();
}

// ==========================================================
// 5. ĐIỀU KHIỂN CÁC MÀN HÌNH (SCREEN CONTROLLER)
// ==========================================================
function hideAllScreens() {
    const screens = ['screenWaiting', 'screenExam', 'screenLocked'];
    screens.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('d-none');
    });
}

function showWaitingScreen() {
    hideAllScreens();
    const el = document.getElementById('screenWaiting');
    if (el) el.classList.remove('d-none');
    startMondayCountdown();
}

function showExamScreen() {
    // Kiểm tra thêm lần nữa xem thí sinh đã thi chưa
    if (getExamSubmission()) {
        showLockedScreen(getExamSubmission());
        return;
    }

    hideAllScreens();
    const el = document.getElementById('screenExam');
    if (el) el.classList.remove('d-none');

    // Khởi tạo đề thi
    renderQuestionPalette();
    loadQuestion(0);
    startExamTimer();
    showToast('🚀 Đã bắt đầu bài thi! Chúc bạn làm bài thật tốt.', 'success');
}

function showLockedScreen(submission) {
    hideAllScreens();
    clearInterval(examTimerInterval);
    clearInterval(mondayCountdownInterval);

    const el = document.getElementById('screenLocked');
    if (el) el.classList.remove('d-none');

    // Nạp dữ liệu lần nộp
    const scoreVal = document.getElementById('finalScoreDisplay');
    const correctVal = document.getElementById('finalCorrectDisplay');
    const durationVal = document.getElementById('finalDurationDisplay');
    const rankVal = document.getElementById('finalRankDisplay');
    const submitTime = document.getElementById('lockSubmissionTime');
    const examHash = document.getElementById('lockExamHash');

    if (scoreVal) scoreVal.innerText = submission.score;
    if (correctVal) correctVal.innerText = `${submission.correctCount} / ${examQuestions.length}`;
    if (durationVal) durationVal.innerText = submission.durationText;
    if (rankVal) rankVal.innerText = submission.rank;
    if (submitTime) submitTime.innerText = submission.submittedAt;
    if (examHash) examHash.innerText = submission.hash;

    // Hiển thị và cập nhật Bảng Xếp Hạng Kỳ Thi
    updateAndRenderLeaderboard(submission);

    // Hiển thị toast cảnh báo không thể thi lại
    setTimeout(() => {
        showToast('⚠️ Bạn đã nộp bài thi này! Mỗi thí sinh chỉ được thi 01 lần duy nhất.', 'error');
    }, 400);
}

// ==========================================================
// 6. LOGIC LÀM BÀI THI & CHỌN ĐÁP ÁN (EXAM RUNNER)
// ==========================================================
function renderQuestionPalette() {
    const grid = document.getElementById('questionPaletteGrid');
    if (!grid) return;

    let html = '';
    for (let i = 0; i < examQuestions.length; i++) {
        const qId = examQuestions[i].id;
        const isAnswered = userAnswers[qId] !== undefined;
        const isFlagged = flaggedQuestions.has(qId);
        const isCurrent = i === currentQuestionIndex;

        let classes = 'palette-btn';
        if (isCurrent) classes += ' current';
        if (isAnswered) classes += ' answered';
        if (isFlagged) classes += ' flagged';

        html += `<button type="button" class="${classes}" onclick="jumpToQuestion(${i})">${i + 1}</button>`;
    }
    grid.innerHTML = html;

    // Cập nhật tỷ lệ hoàn thành
    const answeredCount = Object.keys(userAnswers).length;
    const ratioElem = document.getElementById('answeredRatio');
    if (ratioElem) ratioElem.innerText = `${answeredCount}/${examQuestions.length} đã làm`;
}

function loadQuestion(index) {
    if (index < 0 || index >= examQuestions.length) return;
    currentQuestionIndex = index;

    const q = examQuestions[index];
    const qNum = document.getElementById('currentQuestionNum');
    const qSub = document.getElementById('currentSubjectTag');
    const qContent = document.getElementById('questionContent');
    const optionsWrapper = document.getElementById('answersOptionsWrapper');
    const navIndicator = document.getElementById('navQuestionIndicator');
    const flagBtn = document.getElementById('btnFlagQuestion');

    if (qNum) qNum.innerText = `Câu ${index + 1} / ${examQuestions.length}`;
    if (qSub) qSub.innerText = q.subject;
    if (qContent) qContent.innerHTML = q.question;
    if (navIndicator) navIndicator.innerText = `${index + 1} / ${examQuestions.length}`;

    // Nút flag
    if (flagBtn) {
        if (flaggedQuestions.has(q.id)) {
            flagBtn.classList.add('flagged');
            flagBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i> Đã đánh dấu xem lại';
        } else {
            flagBtn.classList.remove('flagged');
            flagBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i> Đánh dấu xem lại';
        }
    }

    // Nút prev / next
    const btnPrev = document.getElementById('btnPrevQuestion');
    const btnNext = document.getElementById('btnNextQuestion');
    if (btnPrev) btnPrev.disabled = index === 0;
    if (btnNext) {
        if (index === examQuestions.length - 1) {
            btnNext.innerHTML = 'Nộp Bài <i class="fa-solid fa-paper-plane"></i>';
            btnNext.onclick = confirmSubmitExam;
        } else {
            btnNext.innerHTML = 'Câu Tiếp Theo <i class="fa-solid fa-arrow-right"></i>';
            btnNext.onclick = () => navigateQuestion(1);
        }
    }

    // Render 4 đáp án
    let optionsHtml = '';
    const letters = ['A', 'B', 'C', 'D'];
    const chosenAnswer = userAnswers[q.id];

    q.options.forEach((opt, optIndex) => {
        const isSelected = chosenAnswer === optIndex;
        optionsHtml += `
            <div class="answer-option ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${q.id}, ${optIndex})">
                <div class="opt-letter">${letters[optIndex]}</div>
                <div class="opt-text">${opt}</div>
            </div>
        `;
    });

    if (optionsWrapper) optionsWrapper.innerHTML = optionsHtml;

    renderQuestionPalette();
}

function selectAnswer(questionId, optionIndex) {
    userAnswers[questionId] = optionIndex;
    loadQuestion(currentQuestionIndex);
}

function navigateQuestion(direction) {
    const nextIdx = currentQuestionIndex + direction;
    if (nextIdx >= 0 && nextIdx < examQuestions.length) {
        loadQuestion(nextIdx);
    }
}

function jumpToQuestion(index) {
    loadQuestion(index);
}

function toggleFlagQuestion() {
    const q = examQuestions[currentQuestionIndex];
    if (flaggedQuestions.has(q.id)) {
        flaggedQuestions.delete(q.id);
    } else {
        flaggedQuestions.add(q.id);
    }
    loadQuestion(currentQuestionIndex);
}

// ==========================================================
// 7. ĐỒNG HỒ ĐẾM NGƯỢC LÀM BÀI 45 PHÚT (EXAM COUNTDOWN)
// ==========================================================
function startExamTimer() {
    clearInterval(examTimerInterval);
    const timerElem = document.getElementById('examCountdown');
    const timerCard = document.getElementById('timerCard');

    function updateExamTime() {
        if (examCountdownSeconds <= 0) {
            clearInterval(examTimerInterval);
            if (timerElem) timerElem.innerText = "00:00";
            alert("⏰ HẾT GIỜ LÀM BÀI THI! Hệ thống đang tự động thu bài và chấm điểm của bạn.");
            executeSubmitExam();
            return;
        }

        examCountdownSeconds--;
        const mins = Math.floor(examCountdownSeconds / 60);
        const secs = examCountdownSeconds % 60;

        if (timerElem) {
            timerElem.innerText = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
        }

        // Cảnh báo màu vàng khi còn dưới 5 phút, đỏ khi còn dưới 1 phút
        if (timerCard) {
            if (examCountdownSeconds <= 60) {
                timerCard.className = 'timer-display-card timer-danger';
            } else if (examCountdownSeconds <= 300) {
                timerCard.className = 'timer-display-card timer-warning';
            } else {
                timerCard.className = 'timer-display-card';
            }
        }
    }

    updateExamTime();
    examTimerInterval = setInterval(updateExamTime, 1000);
}

// ==========================================================
// 8. CHỐNG GIAN LẬN: CẢNH BÁO CHUYỂN TAB TRÌNH DUYỆT
// ==========================================================
function setupTabSwitchDetection() {
    document.addEventListener('visibilitychange', () => {
        const screenExam = document.getElementById('screenExam');
        // Chỉ cảnh báo nếu đang ở màn hình làm bài thi
        if (screenExam && !screenExam.classList.contains('d-none')) {
            if (document.hidden) {
                tabSwitchViolations++;
                const countElem = document.getElementById('tabSwitchCount');
                if (countElem) countElem.innerText = `${tabSwitchViolations} / 3`;

                if (tabSwitchViolations >= 3) {
                    alert('⛔ CẢNH BÁO VI PHẠM: Bạn đã chuyển tab trình duyệt quá 3 lần! Bài thi sẽ tự động nộp ngay bây giờ.');
                    executeSubmitExam();
                } else {
                    showToast(`⚠️ Cảnh báo: Vui lòng không rời khỏi tab bài thi (${tabSwitchViolations}/3 lần)!`, 'error');
                }
            }
        }
    });
}

// ==========================================================
// 9. NỘP BÀI & KHÓA QUYỀN THI LẠI (SUBMIT & LOCK)
// ==========================================================
function confirmSubmitExam() {
    const answeredCount = Object.keys(userAnswers).length;
    const modalCount = document.getElementById('modalAnsweredCount');
    if (modalCount) modalCount.innerText = `${answeredCount} / ${examQuestions.length}`;

    const modal = document.getElementById('confirmSubmitModal');
    if (modal) modal.classList.add('active');
}

function closeSubmitModal() {
    const modal = document.getElementById('confirmSubmitModal');
    if (modal) modal.classList.remove('active');
}

function executeSubmitExam() {
    closeSubmitModal();
    clearInterval(examTimerInterval);

    // Tính điểm
    let correctCount = 0;
    examQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correct) {
            correctCount++;
        }
    });

    const score = ((correctCount / examQuestions.length) * 10).toFixed(1);
    const timeSpentSeconds = (EXAM_DURATION_MINUTES * 60) - examCountdownSeconds;
    const spentMins = Math.floor(timeSpentSeconds / 60);
    const spentSecs = timeSpentSeconds % 60;
    const durationText = `${spentMins} phút ${spentSecs} giây`;

    let rank = 'Trung Bình';
    if (score >= 9.0) rank = 'Xuất Sắc 🏆';
    else if (score >= 8.0) rank = 'Giỏi ⭐';
    else if (score >= 6.5) rank = 'Khá 👍';

    const now = new Date();
    const formattedDate = `${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()} - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const hash = 'EDUTEST-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);

    const submissionData = {
        examId: EXAM_ID,
        score: score,
        correctCount: correctCount,
        totalQuestions: examQuestions.length,
        durationText: durationText,
        timeSpentSeconds: timeSpentSeconds,
        rank: rank,
        submittedAt: formattedDate,
        hash: hash,
        userAnswers: userAnswers,
        isLocked: true // Cờ khóa: ĐÃ THI KHÔNG THỂ THI LẠI
    };

    // LƯU TRỮ VÀO LOCALSTORAGE ĐỂ KHÓA VĨNH VIỄN
    saveExamSubmission(submissionData);

    // Cập nhật kết quả vào danh sách đề thi đã làm của học sinh
    updateUserExamHistory(submissionData);

    // Chuyển sang màn hình khóa
    showLockedScreen(submissionData);
    showToast(`🎉 Bạn đã hoàn thành bài thi với số điểm: ${score}/10!`, 'success');
}

// Lưu trữ bài thi vào LocalStorage
function saveExamSubmission(data) {
    localStorage.setItem(`eduthcs_submission_${EXAM_ID}`, JSON.stringify(data));
}

function getExamSubmission() {
    const raw = localStorage.getItem(`eduthcs_submission_${EXAM_ID}`);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

function updateUserExamHistory(submission) {
    try {
        const rawUser = localStorage.getItem('eduthcs_user');
        if (rawUser) {
            const user = JSON.parse(rawUser);
            user.lastExamScore = submission.score;
            user.lastExamDate = submission.submittedAt;
            localStorage.setItem('eduthcs_user', JSON.stringify(user));
        }
    } catch (e) {}
}

// ==========================================================
// 10. XEM LẠI BÀI LÀM & LỜI GIẢI CHI TIẾT (REVIEW ANSWERS)
// ==========================================================
function toggleReviewAnswers() {
    const section = document.getElementById('reviewAnswersSection');
    const btnText = document.getElementById('btnReviewText');
    if (!section) return;

    if (section.classList.contains('d-none')) {
        section.classList.remove('d-none');
        if (btnText) btnText.innerText = 'Ẩn Lời Giải Chi Tiết';
        renderReviewAnswers();
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        section.classList.add('d-none');
        if (btnText) btnText.innerText = 'Xem Lại Bài Làm & Lời Giải Chi Tiết';
    }
}

function renderReviewAnswers() {
    const wrapper = document.getElementById('reviewListWrapper');
    if (!wrapper) return;

    const submission = getExamSubmission();
    const answers = submission ? submission.userAnswers : userAnswers;
    const letters = ['A', 'B', 'C', 'D'];

    let html = '';
    examQuestions.forEach((q, index) => {
        const userChoice = answers[q.id];
        const isCorrect = userChoice === q.correct;
        const statusClass = isCorrect ? 'is-correct' : 'is-incorrect';
        const statusIcon = isCorrect ? '<span class="text-green"><i class="fa-solid fa-circle-check"></i> Trả lời ĐÚNG</span>' : '<span class="text-danger"><i class="fa-solid fa-circle-xmark"></i> Trả lời SAI</span>';

        const userChoiceText = userChoice !== undefined ? `${letters[userChoice]}. ${q.options[userChoice]}` : '<em class="text-muted">(Không trả lời)</em>';
        const correctChoiceText = `${letters[q.correct]}. ${q.options[q.correct]}`;

        html += `
            <div class="review-item-card ${statusClass}">
                <div class="review-q-header">
                    <span>Câu ${index + 1}: ${q.subject}</span>
                    <span>${statusIcon}</span>
                </div>
                <div class="review-q-title">${q.question}</div>
                <div class="review-answers-compare">
                    <div><strong>Đáp án bạn chọn:</strong> <span class="${isCorrect ? 'text-green' : 'text-danger'}">${userChoiceText}</span></div>
                    <div><strong>Đáp án chính xác:</strong> <span class="text-green"><strong>${correctChoiceText}</strong></span></div>
                </div>
                <div class="review-explanation">
                    <strong>💡 Lời giải chi tiết:</strong> ${q.explanation}
                </div>
            </div>
        `;
    });

    wrapper.innerHTML = html;
}

// ==========================================================
// 11. HỖ TRỢ TEST DÀNH CHO ADMIN / GIÁM THỊ (RESET ATTEMPT)
// ==========================================================
function adminResetExamAttempt() {
    if (confirm("⚠️ XÁC NHẬN CỦA QUẢN TRỊ VIÊN:\nBạn có muốn xóa dữ liệu bài làm và mở lại quyền thi thử nghiệm cho tài khoản này không?")) {
        localStorage.removeItem(`eduthcs_submission_${EXAM_ID}`);
        removeUserFromLeaderboard();
        userAnswers = {};
        flaggedQuestions.clear();
        tabSwitchViolations = 0;
        examCountdownSeconds = EXAM_DURATION_MINUTES * 60;

        showToast("Đã reset quyền thi và bảng xếp hạng! Bạn có thể bắt đầu làm bài lại để kiểm thử.", "success");
        initExamState();
    }
}

// ==========================================================
// 12. HỆ THỐNG BẢNG XẾP HẠNG THI ĐUA (LEADERBOARD SYSTEM)
// ==========================================================
const LEADERBOARD_STORAGE_KEY = 'eduthcs_weekly_leaderboard_data';

// Dữ liệu xếp hạng minh họa, không phải kết quả của người dùng thật.
const defaultLeaderboardData = [
    {
        id: 'std_01',
        name: 'Học sinh demo 01',
        sbd: 'DEMO-01',
        grade: '9',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        avatarText: 'D1',
        score: 10.0,
        correctCount: 15,
        timeSpentSeconds: 1152, // 19p 12s
        durationText: '19 phút 12 giây',
        submittedAt: '00:19 - 14/10/2026',
        titleBadge: '👑 Trạng Nguyên',
        badgeClass: 'badge-gold',
        isCurrentCandidate: false
    },
    {
        id: 'std_02',
        name: 'Học sinh demo 02',
        sbd: 'DEMO-02',
        grade: '9',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #64748b, #475569)',
        avatarText: 'D2',
        score: 10.0,
        correctCount: 15,
        timeSpentSeconds: 1360, // 22p 40s
        durationText: '22 phút 40 giây',
        submittedAt: '00:23 - 14/10/2026',
        titleBadge: '🥈 Bảng Nhãn',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_03',
        name: 'Học sinh demo 03',
        sbd: 'DEMO-03',
        grade: '8',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #d97706, #b45309)',
        avatarText: 'D3',
        score: 9.3,
        correctCount: 14,
        timeSpentSeconds: 1275, // 21p 15s
        durationText: '21 phút 15 giây',
        submittedAt: '00:21 - 14/10/2026',
        titleBadge: '🥉 Thám Hoa',
        badgeClass: 'badge-bronze',
        isCurrentCandidate: false
    },
    {
        id: 'std_04',
        name: 'Học sinh demo 04',
        sbd: 'DEMO-04',
        grade: '9',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        avatarText: 'D4',
        score: 9.3,
        correctCount: 14,
        timeSpentSeconds: 1490, // 24p 50s
        durationText: '24 phút 50 giây',
        submittedAt: '00:25 - 14/10/2026',
        titleBadge: '⭐ Xuất Sắc',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_05',
        name: 'Học sinh demo 05',
        sbd: 'DEMO-05',
        grade: '9',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #10b981, #059669)',
        avatarText: 'D5',
        score: 9.3,
        correctCount: 14,
        timeSpentSeconds: 1630, // 27p 10s
        durationText: '27 phút 10 giây',
        submittedAt: '00:27 - 14/10/2026',
        titleBadge: '⭐ Xuất Sắc',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_06',
        name: 'Học sinh demo 06',
        sbd: 'DEMO-06',
        grade: '8',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        avatarText: 'D6',
        score: 8.7,
        correctCount: 13,
        timeSpentSeconds: 1385, // 23p 05s
        durationText: '23 phút 05 giây',
        submittedAt: '00:23 - 14/10/2026',
        titleBadge: '🌟 Thủ Khoa KHTN',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_07',
        name: 'Học sinh demo 07',
        sbd: 'DEMO-07',
        grade: '9',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #ec4899, #be185d)',
        avatarText: 'D7',
        score: 8.7,
        correctCount: 13,
        timeSpentSeconds: 1590, // 26p 30s
        durationText: '26 phút 30 giây',
        submittedAt: '00:27 - 14/10/2026',
        titleBadge: '🚀 Học Sinh Giỏi',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_08',
        name: 'Học sinh demo 08',
        sbd: 'DEMO-08',
        grade: '7',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #06b6d4, #0e7490)',
        avatarText: 'D8',
        score: 8.7,
        correctCount: 13,
        timeSpentSeconds: 1905, // 31p 45s
        durationText: '31 phút 45 giây',
        submittedAt: '00:32 - 14/10/2026',
        titleBadge: '💡 Tài Năng Trẻ',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_09',
        name: 'Học sinh demo 09',
        sbd: 'DEMO-09',
        grade: '8',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #f97316, #c2410c)',
        avatarText: 'D9',
        score: 8.0,
        correctCount: 12,
        timeSpentSeconds: 1518, // 25p 18s
        durationText: '25 phút 18 giây',
        submittedAt: '00:25 - 14/10/2026',
        titleBadge: '🎯 Học Sinh Giỏi',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    },
    {
        id: 'std_10',
        name: 'Học sinh demo 10',
        sbd: 'DEMO-10',
        grade: '6',
        school: 'Trường demo',
        avatarBg: 'linear-gradient(135deg, #14b8a6, #0f766e)',
        avatarText: 'D10',
        score: 8.0,
        correctCount: 12,
        timeSpentSeconds: 1780, // 29p 40s
        durationText: '29 phút 40 giây',
        submittedAt: '00:30 - 14/10/2026',
        titleBadge: '🌿 Mầm Non Tri Thức',
        badgeClass: 'badge-silver',
        isCurrentCandidate: false
    }
];

let currentLbGradeFilter = 'all';
let currentLbSearchKeyword = '';
let isLbExpanded = false;
let currentMyLeaderboardRank = 4;

/**
 * Lấy thông tin tài khoản thí sinh hiện tại
 */
function getCurrentCandidateProfile() {
    const rawUser = localStorage.getItem('eduthcs_user');
    let name = 'Học sinh demo';
    let sbd = 'THCS-DEMO';
    let grade = '9';
    let school = 'Trường demo';

    if (rawUser) {
        try {
            const user = JSON.parse(rawUser);
            if (user && user.fullName) {
                name = user.fullName;
                sbd = user.role === 'student' ? 'THCS-' + (user.username || '9A1') : 'THCS-VIP9';
                if (user.grade) grade = String(user.grade);
                if (user.school) school = user.school;
            }
        } catch (e) {}
    }

    return {
        name,
        sbd,
        grade,
        school,
        className: `Lớp ${grade}A1 • ${school}`
    };
}

/**
 * Tải danh sách bảng xếp hạng từ LocalStorage
 */
function getLeaderboardList() {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) {
        // Khởi tạo danh sách mặc định
        localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(defaultLeaderboardData));
        return JSON.parse(JSON.stringify(defaultLeaderboardData));
    }
    try {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
            const seededIds = new Set(defaultLeaderboardData.map(item => item.id));
            const customEntries = list.filter(item => !seededIds.has(item.id));
            if (customEntries.length !== list.length) {
                const cleanedList = [...JSON.parse(JSON.stringify(defaultLeaderboardData)), ...customEntries];
                saveLeaderboardList(cleanedList);
                return cleanedList;
            }
            return list;
        }
        return JSON.parse(JSON.stringify(defaultLeaderboardData));
    } catch (e) {
        return JSON.parse(JSON.stringify(defaultLeaderboardData));
    }
}

/**
 * Lưu danh sách bảng xếp hạng vào LocalStorage
 */
function saveLeaderboardList(list) {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(list));
}

/**
 * Xóa thí sinh hiện tại khỏi bảng xếp hạng khi Admin reset
 */
function removeUserFromLeaderboard() {
    const list = getLeaderboardList();
    const profile = getCurrentCandidateProfile();
    const updated = list.filter(item => !item.isCurrentCandidate && item.sbd !== profile.sbd);
    saveLeaderboardList(updated);
}

/**
 * Đăng ký hoặc cập nhật kết quả bài thi của thí sinh vào bảng xếp hạng
 */
function registerUserExamResultInLeaderboard(submission) {
    const list = getLeaderboardList();
    const profile = getCurrentCandidateProfile();
    const numScore = parseFloat(submission.score);
    const timeSpent = submission.timeSpentSeconds || 1695;

    // Xác định huy hiệu danh dự
    let titleBadge = '⭐ Xuất Sắc';
    let badgeClass = 'badge-silver';
    if (numScore === 10.0) {
        titleBadge = '👑 Trạng Nguyên';
        badgeClass = 'badge-gold';
    } else if (numScore >= 9.0) {
        titleBadge = '🏆 Thủ Khoa Khối';
        badgeClass = 'badge-gold';
    } else if (numScore >= 8.0) {
        titleBadge = '🚀 Học Sinh Giỏi';
        badgeClass = 'badge-silver';
    } else if (numScore >= 6.5) {
        titleBadge = '👍 Học Sinh Khá';
        badgeClass = 'badge-bronze';
    } else {
        titleBadge = '📚 Cần Cố Gắng';
        badgeClass = 'badge-bronze';
    }

    // Tạo chữ viết tắt từ họ tên.
    const nameParts = profile.name.trim().split(' ');
    let avatarText = 'TH';
    if (nameParts.length >= 2) {
        avatarText = (nameParts[nameParts.length - 2][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else if (nameParts.length === 1) {
        avatarText = nameParts[0].substring(0, 2).toUpperCase();
    }

    // Kiểm tra xem thí sinh đã có trong danh sách chưa
    const existingIndex = list.findIndex(item => item.isCurrentCandidate || item.sbd === profile.sbd);

    const userEntry = {
        id: 'std_current_user',
        name: profile.name,
        sbd: profile.sbd,
        grade: profile.grade,
        school: profile.school,
        avatarBg: 'linear-gradient(135deg, #2563eb, #7c3aed)',
        avatarText: avatarText,
        score: numScore,
        correctCount: submission.correctCount,
        timeSpentSeconds: timeSpent,
        durationText: submission.durationText,
        submittedAt: submission.submittedAt,
        titleBadge: titleBadge,
        badgeClass: badgeClass,
        isCurrentCandidate: true
    };

    if (existingIndex !== -1) {
        list[existingIndex] = userEntry;
    } else {
        list.push(userEntry);
    }

    // SẮP XẾP BẢNG XẾP HẠNG:
    // 1. Điểm số cao hơn xếp trước (b.score - a.score)
    // 2. Nếu bằng điểm, thời gian làm bài ít hơn (nhanh hơn) xếp trước (a.timeSpentSeconds - b.timeSpentSeconds)
    list.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.timeSpentSeconds - b.timeSpentSeconds;
    });

    // Cập nhật lại danh hiệu Trạng Nguyên, Bảng Nhãn, Thám Hoa cho Top 1, 2, 3
    if (list[0]) {
        list[0].titleBadge = '👑 Trạng Nguyên';
        list[0].badgeClass = 'badge-gold';
    }
    if (list[1]) {
        list[1].titleBadge = '🥈 Bảng Nhãn';
        list[1].badgeClass = 'badge-silver';
    }
    if (list[2]) {
        list[2].titleBadge = '🥉 Thám Hoa';
        list[2].badgeClass = 'badge-bronze';
    }

    saveLeaderboardList(list);

    // Tính thứ hạng của thí sinh
    const myRank = list.findIndex(item => item.isCurrentCandidate) + 1;
    currentMyLeaderboardRank = myRank > 0 ? myRank : 1;

    return { list, myRank: currentMyLeaderboardRank, userEntry };
}

/**
 * Cập nhật và render Bảng Xếp Hạng khi thí sinh thi xong
 */
function updateAndRenderLeaderboard(submission) {
    if (!submission) return;

    // Đăng ký kết quả vào dữ liệu bảng xếp hạng
    const { list, myRank, userEntry } = registerUserExamResultInLeaderboard(submission);

    // Cập nhật thẻ kết quả tổng quan (#finalRankDisplay)
    const finalRankDisplay = document.getElementById('finalRankDisplay');
    if (finalRankDisplay) {
        if (myRank === 1) finalRankDisplay.innerText = 'Hạng #1 (Thủ Khoa 👑)';
        else if (myRank <= 3) finalRankDisplay.innerText = `Hạng #${myRank} (Top 3 🏆)`;
        else finalRankDisplay.innerText = `Hạng #${myRank} (${submission.rank})`;
    }

    // Cập nhật Card Vị Trí Của Thí Sinh Hiện Tại
    const myNameElem = document.getElementById('myRankCandidateName');
    const myScoreElem = document.getElementById('myRankScore');
    const myCorrectElem = document.getElementById('myRankCorrect');
    const myDurationElem = document.getElementById('myRankDuration');
    const myNumberElem = document.getElementById('myRankNumber');
    const myTierElem = document.getElementById('myRankTier');

    if (myNameElem) myNameElem.innerText = `${userEntry.name} (SBD: ${userEntry.sbd})`;
    if (myScoreElem) myScoreElem.innerText = userEntry.score.toFixed(1);
    if (myCorrectElem) myCorrectElem.innerText = `${userEntry.correctCount} / 15`;
    if (myDurationElem) myDurationElem.innerText = userEntry.durationText;
    if (myNumberElem) myNumberElem.innerText = `#${myRank}`;

    if (myTierElem) {
        if (myRank === 1) {
            myTierElem.innerHTML = '<i class="fa-solid fa-crown text-gold"></i> Thủ Khoa Toàn Hệ Thống Tuần Này!';
        } else if (myRank <= 3) {
            myTierElem.innerHTML = '<i class="fa-solid fa-award text-gold"></i> Đạt Top 3 Xuất Sắc Nhất!';
        } else if (myRank <= 5) {
            myTierElem.innerHTML = '<i class="fa-solid fa-medal"></i> Top 5% Thí Sinh Toàn Quốc';
        } else if (myRank <= 10) {
            myTierElem.innerHTML = '<i class="fa-solid fa-star"></i> Top 10 Bảng Vàng Danh Dự';
        } else {
            myTierElem.innerHTML = '<i class="fa-solid fa-check"></i> Đã Hoàn Thành Đạt Chuẩn';
        }
    }

    // Render Bục Podium & Bảng danh sách
    renderPodiumAndTable();
}

/**
 * Lọc và render Podium + Bảng Xếp Hạng
 */
function renderPodiumAndTable() {
    const list = getLeaderboardList();
    const keyword = currentLbSearchKeyword.toLowerCase().trim();

    // 1. Lọc theo Khối lớp & Từ khóa
    let filtered = list.filter(item => {
        const matchGrade = (currentLbGradeFilter === 'all' || item.grade === currentLbGradeFilter);
        const matchKeyword = !keyword || (
            item.name.toLowerCase().includes(keyword) ||
            item.sbd.toLowerCase().includes(keyword) ||
            item.school.toLowerCase().includes(keyword)
        );
        return matchGrade && matchKeyword;
    });

    // 2. Render Podium Top 3 (lấy từ top 3 của kết quả lọc hoặc top 3 toàn diện)
    renderPodium(filtered.slice(0, 3));

    // 3. Render Table
    renderLeaderboardTable(filtered);
}

/**
 * Render Bục Vinh Quang Top 3 (2nd - 1st - 3rd)
 */
function renderPodium(top3) {
    const podiumGrid = document.getElementById('podiumGrid');
    if (!podiumGrid) return;

    if (!top3 || top3.length === 0) {
        podiumGrid.innerHTML = '<div style="grid-column: 1 / -1; padding: 20px; color: #94a3b8;">Chưa có dữ liệu thủ khoa cho bộ lọc này.</div>';
        return;
    }

    let html = '';
    const medals = [
        { rank: 1, title: '🥇 THỦ KHOA', class: 'podium-rank-1', badgeClass: 'badge-gold', icon: '👑' },
        { rank: 2, title: '🥈 Á KHOA 1', class: 'podium-rank-2', badgeClass: 'badge-silver', icon: '🥈' },
        { rank: 3, title: '🥉 Á KHOA 2', class: 'podium-rank-3', badgeClass: 'badge-bronze', icon: '🥉' }
    ];

    top3.forEach((std, index) => {
        const m = medals[index];
        const isUser = std.isCurrentCandidate ? 'border: 3px solid #2563eb;' : '';
        const userTag = std.isCurrentCandidate ? '<span class="tag-you" style="margin-left: 4px;">BẠN</span>' : '';

        html += `
            <div class="podium-card ${m.class}" style="${isUser}">
                ${index === 0 ? '<div class="podium-crown"><i class="fa-solid fa-crown"></i></div>' : ''}
                <div class="podium-avatar-wrap" style="background: ${std.avatarBg};">
                    ${std.avatarText}
                </div>
                <div class="podium-medal-badge ${m.badgeClass}">
                    ${m.title}
                </div>
                <h4 class="podium-name" title="${std.name}">${std.name} ${userTag}</h4>
                <div class="podium-school">${std.school} (Lớp ${std.grade})</div>
                <div class="podium-score-pill">${std.score.toFixed(1)} Điểm</div>
                <span class="podium-time"><i class="fa-regular fa-clock"></i> ${std.durationText}</span>
            </div>
        `;
    });

    podiumGrid.innerHTML = html;
}

/**
 * Render danh sách thí sinh dạng Bảng
 */
function renderLeaderboardTable(filteredList) {
    const tbody = document.getElementById('leaderboardTbody');
    const countElem = document.getElementById('lbCountText');
    const toggleBtn = document.getElementById('btnToggleAllLb');
    const expandText = document.getElementById('expandLbText');
    const expandIcon = document.getElementById('expandLbIcon');

    if (!tbody) return;

    if (filteredList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 30px; color: #94a3b8;">
                    <i class="fa-regular fa-folder-open" style="font-size: 2rem; margin-bottom: 8px; display: block;"></i>
                    Không tìm thấy thí sinh phù hợp với từ khóa tìm kiếm.
                </td>
            </tr>
        `;
        if (countElem) countElem.innerText = '0 thí sinh';
        if (toggleBtn) toggleBtn.style.display = 'none';
        return;
    }

    // Giới hạn hiển thị Top 10 nếu chưa bấm xem thêm
    const displayList = isLbExpanded ? filteredList : filteredList.slice(0, 10);

    let html = '';
    displayList.forEach((item, index) => {
        const fullList = getLeaderboardList();
        // Lấy thứ hạng thực tế trong toàn bảng
        const realRank = fullList.findIndex(x => x.sbd === item.sbd) + 1 || (index + 1);

        let rankBadgeHtml = '';
        if (realRank === 1) rankBadgeHtml = '<span class="rank-col-badge rank-1-badge">🥇</span>';
        else if (realRank === 2) rankBadgeHtml = '<span class="rank-col-badge rank-2-badge">🥈</span>';
        else if (realRank === 3) rankBadgeHtml = '<span class="rank-col-badge rank-3-badge">🥉</span>';
        else rankBadgeHtml = `<span class="rank-col-badge rank-other-badge">#${realRank}</span>`;

        const userRowClass = item.isCurrentCandidate ? 'is-current-user' : '';
        const userTag = item.isCurrentCandidate ? '<span class="tag-you">BẠN</span>' : '';
        const scoreClass = item.score === 10 ? 'score-10' : '';

        html += `
            <tr class="${userRowClass}">
                <td class="text-center">${rankBadgeHtml}</td>
                <td>
                    <div class="student-cell">
                        <div class="student-cell-avatar" style="background: ${item.avatarBg};">
                            ${item.avatarText}
                        </div>
                        <div class="student-name-box">
                            <strong>${item.name} ${userTag}</strong>
                            <span>SBD: ${item.sbd}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span style="font-weight: 600; color: #334155;">Lớp ${item.grade}</span><br>
                    <span style="font-size: 0.75rem; color: #64748b;">${item.school}</span>
                </td>
                <td class="text-center" style="font-weight: 700; color: #059669;">
                    ${item.correctCount} / 15
                </td>
                <td class="text-center">
                    <span class="score-pill ${scoreClass}">${item.score.toFixed(1)}</span>
                </td>
                <td class="text-center" style="color: #475569; font-size: 0.82rem;">
                    <i class="fa-regular fa-clock text-primary"></i> ${item.durationText}
                </td>
                <td class="text-center" style="color: #64748b; font-size: 0.8rem;">
                    ${item.submittedAt}
                </td>
                <td class="text-center">
                    <span class="title-pill ${item.badgeClass}">${item.titleBadge}</span>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;

    // Cập nhật số lượng hiển thị ở footer
    if (countElem) {
        countElem.innerText = `Đang hiển thị ${displayList.length} / ${filteredList.length} thí sinh`;
    }

    if (toggleBtn) {
        if (filteredList.length <= 10) {
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'inline-flex';
            if (expandText) expandText.innerText = isLbExpanded ? 'Thu Gọn Danh Sách' : 'Xem Toàn Bộ Thí Sinh';
            if (expandIcon) expandIcon.className = isLbExpanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
        }
    }
}

/**
 * Lọc bảng xếp hạng theo Khối Lớp
 */
function filterLeaderboardByGrade(grade, btn) {
    currentLbGradeFilter = grade;

    const tabs = document.querySelectorAll('#lbGradeTabs .btn-grade-tab');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    renderPodiumAndTable();
}

/**
 * Tìm kiếm thí sinh theo từ khóa
 */
function handleLeaderboardSearch() {
    const searchInput = document.getElementById('lbSearchKeyword');
    if (!searchInput) return;
    currentLbSearchKeyword = searchInput.value;
    renderPodiumAndTable();
}

/**
 * Mở rộng / Thu gọn toàn bộ danh sách bảng xếp hạng
 */
function toggleExpandLeaderboard() {
    isLbExpanded = !isLbExpanded;
    renderPodiumAndTable();
}

/**
 * Cuộn mượt tới khu vực Bảng Xếp Hạng
 */
function scrollToLeaderboard() {
    const section = document.getElementById('examLeaderboardSection');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Làm mới bảng xếp hạng
 */
function reloadLeaderboardView() {
    renderPodiumAndTable();
    showToast('✨ Đã làm mới dữ liệu Bảng Vàng Xếp Hạng!', 'success');
}

/**
 * Mở Modal Chia Sẻ Thành Tích (Certificate)
 */
function openShareResultModal() {
    const submission = getExamSubmission();
    const modal = document.getElementById('shareResultModal');
    const profile = getCurrentCandidateProfile();
    
    const certName = document.getElementById('certName');
    const certSchool = document.getElementById('certSchool');
    const certScore = document.getElementById('certScore');
    const certRank = document.getElementById('certRank');
    const certDuration = document.getElementById('certDuration');
    const certCode = document.getElementById('certCode');

    if (certName) certName.innerText = profile.name;
    if (certSchool) certSchool.innerText = `${profile.className} • SBD: ${profile.sbd}`;
    if (certScore) certScore.innerText = submission ? `${submission.score}/10` : '9.3/10';
    if (certRank) certRank.innerText = `#${currentMyLeaderboardRank}`;
    if (certDuration) certDuration.innerText = submission ? submission.durationText : '24p 15s';
    if (certCode) certCode.innerText = submission ? submission.hash : 'EDUTEST-2026-9A1';

    if (modal) modal.classList.add('active');
}

function closeShareResultModal() {
    const modal = document.getElementById('shareResultModal');
    if (modal) modal.classList.remove('active');
}

/**
 * Sao chép nội dung chứng nhận để khoe thành tích
 */
function copyShareCertificateText() {
    const submission = getExamSubmission();
    const profile = getCurrentCandidateProfile();
    const score = submission ? submission.score : '9.3';
    const correct = submission ? submission.correctCount : 14;
    const duration = submission ? submission.durationText : '24 phút 15 giây';
    const hash = submission ? submission.hash : 'EDUTEST-2026-9A1-94821';

    const text = `🏆 CHỨNG NHẬN VINH DANH HỌC SINH GIỎI - KỲ THI THCS EDUTHCS\n` +
        `👤 Thí sinh: ${profile.name}\n` +
        `🏫 Đơn vị: ${profile.className}\n` +
        `🎯 Điểm số: ${score}/10 (Đúng ${correct}/15 câu)\n` +
        `🎖️ Thứ hạng: #${currentMyLeaderboardRank} Bảng Vàng Toàn Quốc\n` +
        `⏱️ Thời gian hoàn thành: ${duration}\n` +
        `🔑 Mã tra cứu: ${hash}\n` +
        `👉 Tham gia thi trực tuyến mở lúc 00:00 Thứ 2 hàng tuần tại EduTHCS!`;

    navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Đã sao chép nội dung thành tích vào Clipboard! Bạn có thể dán để khoe với bạn bè và phụ huynh.', 'success');
    }).catch(() => {
        showToast('Đã tạo thành công chứng nhận vinh danh!', 'info');
    });
}

/**
 * Mở modal xem Bảng Vàng từ Màn hình chờ
 */
function openWaitingLeaderboardModal() {
    const modal = document.getElementById('waitingLeaderboardModal');
    const container = document.getElementById('waitingLeaderboardModalContent');
    if (!modal || !container) return;

    const list = getLeaderboardList();
    const top5 = list.slice(0, 5);

    let html = `
        <div style="background: linear-gradient(135deg, #eff6ff, #fdf2f8); padding: 18px 22px; border-radius: var(--radius-md); margin-bottom: 20px; border: 1px solid #bfdbfe;">
            <p style="margin: 0; font-size: 0.9rem; color: #1e40af;">
                <i class="fa-solid fa-bell"></i> Kỳ thi khảo sát tuần này sẽ mở đề vào <strong>00:00 Thứ 2</strong>. Dưới đây là danh sách các bạn học sinh có điểm số cao nhất hiện tại:
            </p>
        </div>
        <div class="table-responsive">
            <table class="lb-table">
                <thead>
                    <tr>
                        <th class="text-center" style="width: 70px;">Hạng</th>
                        <th>Học Sinh</th>
                        <th>Trường & Lớp</th>
                        <th class="text-center">Số Câu Đúng</th>
                        <th class="text-center">Điểm Số</th>
                        <th class="text-center">Thời Gian</th>
                        <th class="text-center">Danh Hiệu</th>
                    </tr>
                </thead>
                <tbody>
    `;

    top5.forEach((item, idx) => {
        const medal = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
        html += `
            <tr>
                <td class="text-center" style="font-weight: 800; font-size: 1.1rem;">${medal}</td>
                <td>
                    <div class="student-cell">
                        <div class="student-cell-avatar" style="background: ${item.avatarBg};">${item.avatarText}</div>
                        <strong>${item.name}</strong>
                    </div>
                </td>
                <td>Lớp ${item.grade} • ${item.school}</td>
                <td class="text-center" style="font-weight: 700; color: #059669;">${item.correctCount}/15</td>
                <td class="text-center"><span class="score-pill ${item.score === 10 ? 'score-10' : ''}">${item.score.toFixed(1)}</span></td>
                <td class="text-center" style="font-size: 0.82rem; color: #475569;">${item.durationText}</td>
                <td class="text-center"><span class="title-pill ${item.badgeClass}">${item.titleBadge}</span></td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
        <div style="text-align: center; margin-top: 24px;">
            <button type="button" class="btn btn-primary" onclick="closeWaitingLeaderboardModal()">
                <i class="fa-solid fa-check"></i> Đã Hiểu, Sẵn Sàng Ôn Luyện!
            </button>
        </div>
    `;

    container.innerHTML = html;
    modal.classList.add('active');
}

function closeWaitingLeaderboardModal() {
    const modal = document.getElementById('waitingLeaderboardModal');
    if (modal) modal.classList.remove('active');
}
