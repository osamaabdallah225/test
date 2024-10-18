// تحويل الأزرار إلى مصفوفة
let arr = Array.from(document.getElementsByClassName('main-button'));     // الكلاس الاساسي main-button
let mainContent = document.querySelectorAll('.main-content1, .main-content2, .main-content3, .main-content4, .main-content5, .main-content6, .main-content7, .main-content8, .main-content9, .main-content10');
// الكاسات الاساسية اللي بداخل كلاس main-button
// إخفاء جميع العناصر عند فتح البرنامج  
function hideAllExceptFeatures() {
    mainContent.forEach((el) => {
        el.style.display = 'none';


    });

}

// إعادة تعيين تنسيقات الأزرار إلى حالتها الافتراضية
function resetButtonStyles() {
    arr.forEach((el) => {
        el.style.backgroundColor = '';  // إعادة لون الخلفية للحالة الافتراضية
        el.style.boxShadow = '';  // إزالة الظل
        document.getElementById("finished").style.display = 'none';  // اخفاء رسالة الانتهاء من الذكر


    });
}

// إخفاء جميع العناصر النصية
function hideAll() {
    mainContent.forEach((el) => {
        el.style.display = 'none';
    });
}




// إضافة حدث تحميل الصفحة
window.addEventListener('DOMContentLoaded', hideAllExceptFeatures); // إخفاء جميع العناصر features عند تحميل الصفحة

// عند الضغط علي اي كلاس من الكلاسات الاساسية 
arr.forEach((el, index) => {

    el.addEventListener('click', () => {
        hideAll();  // إخفاء جميع العناصر
        resetButtonStyles();  // إعادة تنسيق الأزرار
        document.getElementById("menuIcon").style.display = 'block';

        // إظهار العنصر المطلوب بناءً على الزر
        document.querySelector(`.main-content${index + 1}`).style.display = 'block';
        el.style.backgroundColor = '#005672';
        el.style.boxShadow = '0 0 10px #008CB9';
        // checkUpdateNumber()
        checkUpdateNumber()   // دالة تشيك علي التحديث
        resetProgressBar()   // تصفير شريط التقدم
        resetCounters() //  تصفير شريط التقدم
    });
});



// *******************************************

//  اعادة العدادات الخاصة بي شريط التقدم



// دالة لإعادة تعيين شريط التقدم
function resetProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const percentageDisplay = document.getElementById("percentage");

    document.getElementById("progress-container").style.display = 'none';  // إخفاء الحاوية إذا كانت ظاهرة
    progressBar.style.width = '0%';  // إعادة عرض شريط التقدم إلى 0%


    // إعادة تعيين العدادات
    zeroCounts = Array.from(buttonDivs).map(() => 0); // إعادة تعيين العدادات لكل div
}

// دالة لإعادة تعيين العدادات وإظهار العناصر المخفية
function resetCounters() {
    button.forEach((el, index) => {
        el.innerText = originalCounts[index]; // إعادة العداد إلى قيمته الأصلية

    });
}


// ********************************

// شريط progress bar

const progressBar = document.getElementById('progress-bar');
// const percentageDisplay = document.getElementById('percentage');

// الحصول على جميع الأزرار في كل div
const buttonDivs = document.querySelectorAll('.main-content1, .main-content2, .main-content3 , .main-content4, .main-content5, .main-content6, .main-content7, .main-content8, .main-content9');

// إعداد مصفوفة لحفظ عدد الأزرار التي وصلت إلى صفر في كل div
let zeroCounts = Array.from(buttonDivs).map(() => 0);
let totalButtonsInDiv = Array.from(buttonDivs).map(el => el.querySelectorAll('.button-sub').length);



buttonDivs.forEach((el, divIndex) => {
    const buttons = el.querySelectorAll('.button-sub');

    // إضافة حدث عند النقر على الأزرار في هذا div
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById("progress-container").style.display = 'block';
            // تقليل قيمة العداد عند النقر على الزر
            let value = parseInt(button.innerText);
            if (value > 0) {
                value--;
                button.innerText = value; // تحديث قيمة الزر المعروضة

                // إذا وصلت القيمة للصفر، نزيد العداد
                if (value === 0) {
                    zeroCounts[divIndex]++; // زيادة العد في هذا div
                    calculatePercentage(divIndex);
                    // checkAllCountersEmpty() ;
                }
                if (buttonDivs[divIndex].querySelectorAll('.button-sub').length === zeroCounts[divIndex]) {
                    setTimeout(() => {
                        document.getElementById("finished").style.display = 'block'; // أظهار رسالة الانتهاء من الذكر

                    }, 800)
                }

            }
        });
    });
});

// حساب النسبة المئوية بناءً على عدد الأزرار التي وصلت إلى صفر في هذا div
function calculatePercentage(divIndex) {
    const percentage = (zeroCounts[divIndex] / totalButtonsInDiv[divIndex]) * 100; // حساب النسبة

    // تحديث شريط التقدم
    progressBar.style.width = percentage + '%'; // ضبط عرض شريط التقدم
    // percentageDisplay.textContent = Math.round(percentage) + '%'; // عرض النسبة المئوية
}
// حساب النسبة المئوية بناءً على عدد الأزرار التي وصلت إلى صفر في هذا div



// *******************************
// تخزين الأزرار الخاصة بالعدادات
let button = Array.from(document.getElementsByClassName("button-sub"));

// تخزين القيم الأصلية للعدادات
let originalCounts = [];

// حفظ القيمة الأصلية لكل عداد عند تحميل الصفحة
button.forEach((el) => {
    originalCounts.push(parseInt(el.innerText)); // حفظ القيمة الأصلية للعداد

    el.addEventListener('click', () => {

        let count = parseInt(el.innerText);  // أخذ القيمة الحالية
        if (count > 0) {
            el.innerText = count;  // تحديث النص

        }


        // إخفاء العنصر إذا وصل العداد إلى 0
        if (count <= 0) {
            el.parentNode.style.transition = 'transform 1.3s ease-out', 'opacity 1.3s ease'; // إضافة انتقال سلس
            el.parentNode.style.transform = 'translateX(-400px) '; // تحريك العنصر لأعلى وتكبيره
            el.parentNode.style.opacity = '.4 '; // تحريك العنصر لأعلى وتكبيره


            // إخفاء العنصر بعد انتهاء الانتقال
            setTimeout(() => {
                el.parentNode.style.display = 'none';  // إخفاء العنصر بعد 0.5 ثانية
            }, 800); // نفس مدة الانتقال


        }

        el.style.backgroundColor = count > 0 ? "green" : ""; // تغيير اللون بناءً على القيمة

    });


});

// دالة لإعادة تعيين العدادات وإظهار العناصر المخفية الخاصة بالازرار الداخلية
function resetCounters() {
    button.forEach((el, index) => {
        el.innerText = originalCounts[index]; // إعادة العداد إلى قيمته الأصلية
        el.style.backgroundColor = "";  // إعادة لون الخلفية إلى الحالة الافتراضية
        el.parentNode.style.display = 'block';  // إظهار العنصر المخفي
        el.parentNode.style.transition = "none"; // إضافة انتقال سلس
        el.parentNode.style.transform = "none"; // تحريك العنصر لأعلى وتكبيره
        el.parentNode.style.opacity = "";

    });
}

// إضافة زر لإعادة تعيين العدادات وإظهار العناصر المخفية عند الضغط على الأزرار الرئيسية
const restoreButton = document.querySelectorAll(".main-button");
restoreButton.forEach((el) => {
    el.addEventListener('click', resetCounters);  // عند الضغط على أي زر رئيسي، يتم إعادة تعيين العدادات وإظهار العناصر المخفية
});


//  الجزء الخاص بالتسابيح

const circles = document.querySelectorAll('.circles');   // تعريف الدواير (الاذكار)
const counters = document.querySelectorAll('.counter');  // تعريف العداد
const img = document.querySelectorAll('.img');           // تعريف الصور اللي هتظهر داخل الدايرة لما تكبر
const totalCounter = document.querySelector('.total-counter');  // العداد التوتال
let counts = Array(circles.length).fill(0); // Array to store counts for each circle
let totalCount = 0; // Total count

// عندما يتم النقر على زر العودة
document.getElementById('back-circle').addEventListener('click', () => {
document.getElementById('back-circle').classList.add('disactive');   // اخفاء زر العودة
document.getElementById("icon").style.display = "block";  // اظهار ايقونة التصفير 
});

// إضافة مستمعات الضغط على الدوائر
circles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        // إذا كانت الدائرة غير نشطة (صغيرة)، قم بتكبيرها فقط
        if (!circle.classList.contains('active')) {
            // إزالة الكلاس 'active' من جميع الدوائر الأخرى
            // circles.forEach(c => c.classList.remove('active'));

            // إضافة الكلاس 'active' لهذه الدائرة لجعلها كبيرة
            circle.classList.add('active');

            // إخفاء جميع الصور أولاً
            img.forEach(i => i.style.display = "none");

            // عرض الصورة الخاصة بهذه الدائرة
            if (img[index]) {
                img[index].style.display = "block";
            }

            // جعل زر الرجوع مرئي
            document.getElementById('back-circle').classList.remove('disactive');
            document.getElementById("icon").style.display = "none";  // اخفاء ايقونة التصفير
        } else {
            // إذا كانت الدائرة نشطة (كبرت)، زيادة العداد
            ButtonClick(index); // زيادة العداد فقط إذا كانت نشطة
        }
    });
});

// دالة لزيادة العداد
function ButtonClick(index) {
    counts[index]++; // زيادة العداد لهذه الدائرة
    totalCount++; // زيادة العد الكلي

    // تحديث العداد الفردي في الـ DOM
    counters[index].innerText = counts[index];

    // تحديث العد الكلي في الـ DOM
    totalCounter.innerText = totalCount;
}

// دالة لإعادة تعيين الدوائر عندما يتم النقر على زر 'back-circle'
document.getElementById('back-circle').addEventListener('click', () => {
    circles.forEach(c => c.classList.remove('active')); // إزالة الكلاس 'active' من جميع الدوائر
    img.forEach(i => i.style.display = "none"); // إخفاء جميع الصور
});

// دالة لإعادة القيم إلى حالتها الافتراضية عند الضغط على زر إعادة التعيين
document.getElementById("icon").addEventListener("click", function () {
    counts.fill(0); // إعادة جميع العدادات إلى 0
    totalCount = 0; // إعادة العد الكلي إلى 0
    totalCounter.innerText = 0;

    // إعادة تعيين النصوص
    counters.forEach((span) => {
        span.innerText = "0"; // إعادة النص إلى فارغ
    });

    // إخفاء جميع الصور بعد إعادة التعيين
    img.forEach(i => i.style.display = "none");

    // إعادة تعيين الدوائر إلى حالتها الأصلية
    circles.forEach(c => {
        c.classList.remove('active');
    });
});


// *********************************************************
//  الاعدادت


let fontSize = localStorage.getItem("fontSize") ? parseInt(localStorage.getItem("fontSize")) : 25; // استعادة الحجم المحفوظ أو تعيين الحجم الافتراضي

// استعادة حجم الخط عند تحميل الصفحة
window.addEventListener("load", function () {
    let elements = Array.from(document.getElementsByTagName("p")); // الحصول على جميع عناصر <p>
    elements.forEach(el => {
        el.style.fontSize = fontSize + "px"; // تعيين حجم الخط المحفوظ
    });

    // التحقق من تعطيل الأزرار بعد التغيير
    checkButtonState();
});



// زر التكبير
document.getElementById("plus").addEventListener("click", function () {
    if (fontSize < 60) { // تحقق من عدم تجاوز الحد الأقصى
        fontSize += 2; // زيادة حجم الخط بمقدار 2
        let elements = Array.from(document.getElementsByTagName("p")); // الحصول على جميع عناصر <p>

        // تعديل حجم الخط لكل عنصر <p>
        elements.forEach(el => {
            el.style.fontSize = fontSize + "px";
        });

        // حفظ حجم الخط في Local Storage
        localStorage.setItem("fontSize", fontSize);
        document.getElementById("seeFont").innerHTML = fontSize + "px";

        // التحقق من تعطيل الأزرار بعد التغيير
        checkButtonState();
    }
});

// زر التصغير
document.getElementById("minus").addEventListener("click", function () {
    if (fontSize > 16) { // تحقق من عدم تجاوز الحد الأدنى
        fontSize -= 2; // تقليل حجم الخط بمقدار 2
        let elements = Array.from(document.getElementsByTagName("p")); // الحصول على جميع عناصر <p>

        // تعديل حجم الخط لكل عنصر <p> مع التأكد من أن الحجم لا يقل عن 10px
        elements.forEach(el => {
            el.style.fontSize = fontSize + "px";
        });

        // حفظ حجم الخط في Local Storage
        localStorage.setItem("fontSize", fontSize);
        document.getElementById("seeFont").innerHTML = fontSize + "px";

        // التحقق من تعطيل الأزرار بعد التغيير
        checkButtonState();

    }
});

document.getElementById("seeFont").innerHTML = fontSize + "px";
// دالة للتحقق من حالة الأزرار

function checkButtonState() {
    if (fontSize >= 60) {
        document.getElementById("plus").disabled = true; // تعطيل زر التكبير
    } else {
        document.getElementById("plus").disabled = false; // تفعيل زر التكبير
    }

    if (fontSize <= 15) {
        document.getElementById("minus").disabled = true; // تعطيل زر التصغير
    } else {
        document.getElementById("minus").disabled = false; // تفعيل زر التصغير
    }
}



document.getElementById("theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
})

// استعادة الوضع المحفوظ من LocalStorage أو تعيين الوضع الافتراضي "light"
let themeMode = localStorage.getItem("theme") || "light";
// تطبيق الوضع المحفوظ عند تحميل الصفحة
document.body.className = themeMode;
// تفعيل زر التبديل
document.getElementById("theme").addEventListener("click", function () {
    // تبديل السمة بين "light" و "dark"
    themeMode = themeMode === "light" ? "dark" : "light";

    // تطبيق السمة الجديدة
    document.body.className = themeMode;

    // حفظ السمة الجديدة في LocalStorage
    localStorage.setItem("theme", themeMode);
});

// *********************************

// bold text for paragraphs



// عند تحميل الصفحة، تحقق من localStorage
// عند تحميل الصفحة، تحقق من localStorage
window.addEventListener("load", function () {
    // إذا كانت القيمة غير موجودة في localStorage أو كانت "false"، تطبيق الخط العريض كإعداد افتراضي
    let isBold = localStorage.getItem("bold") === "true" || localStorage.getItem("bold") === null; // إذا كانت null أو true

    let elements = Array.from(document.getElementsByTagName("p")); // الحصول على جميع عناصر <p>

    // إذا كانت القيمة مخزنة بـ "true" أو إذا كانت null (إعداد افتراضي)، نطبق الخط العريض
    if (isBold) {
        elements.forEach(el => {
            el.style.fontWeight = "bold";
        });
    } else {
        // إذا كانت القيمة "false"، نطبق الخط العادي
        elements.forEach(el => {
            el.style.fontWeight = "normal";
        });
    }
});

// عند النقر على الزر لتبديل الحالة
document.getElementById("bold").addEventListener("click", function () {
    let elements = Array.from(document.getElementsByTagName("p")); // الحصول على جميع عناصر <p>
    let isBold = false;  // نبدأ في حالة أن النصوص ليست عريضة

    elements.forEach(el => {
        // استخدام getComputedStyle للحصول على الوزن الفعلي للخط
        let currentFontWeight = window.getComputedStyle(el).fontWeight;

        // تحقق من ما إذا كان الخط عريضًا باستخدام قيم مختلفة
        if (currentFontWeight === "bold" || currentFontWeight === "700") {
            el.style.fontWeight = "normal"; // إذا كان عريضًا، غيره إلى عادي
        } else {
            el.style.fontWeight = "bold"; // إذا كان عاديًا، اجعل الخط عريضًا
            isBold = true; // حافظ على حالة أن الخط أصبح عريضًا
        }
    });

    // حفظ الحالة الحالية في localStorage (true إذا تم تطبيق bold، false إذا لم يتم تطبيقه)
    localStorage.setItem("bold", isBold ? "true" : "false");
});


// **********************************


//  نهاية الاعدادات

// وضع الموبايل على الصفحة
// ********************
// ********************
// ********************
// ********************
// ********************

if (window.innerWidth < 600) {
    // متغير لتخزين حالة ظهور الأزرار
    // let areButtonsVisible = false;
    // دالة لإخفاء جميع العناصر ما عدا العنصر الذي تم النقر عليه وتثبيته في أعلى الصفحة
    let activeButtonIndex = -1; // لحفظ الزر النشط
    let isButtonActive = true; // حالة الزر (مفعل أو غير مفعل)

    function hideOthersAndFix(event) {
        const allButtons = document.querySelectorAll('.main-button');

        allButtons.forEach((el, index) => {
            // إخفاء العنصر إذا لم يكن هو العنصر الذي تم النقر عليه
            if (el !== event.target) {
                el.style.display = 'none';

            } else {
                if (isButtonActive) {
                    checkUpdateNumber(); // دالة تشيك علي التحديث

                    // تثبيت العنصر في أعلى الصفحة
                    el.style.position = 'fixed';
                    el.style.top = '0px';
                    el.style.left = '50%';
                    el.style.transform = 'translateX(-50%)';
                    el.style.zIndex = '10';
                    el.style.margin = '0px 0px 50px 0px';
                    el.style.pointerEvents = 'none'; // تعطيل الضغط على الزر المختار
                    isButtonActive = false; // تعطيل الزر بعد الضغط عليه
                    activeButtonIndex = index; // تحديث الزر النشط
                    el.style.boxShadow = '';
                    el.style.backgroundColor = '';
                    document.body.style.paddingTop = '60px';





                }
            }
        });
    }


    // إضافة مستمع للأحداث لجميع العناصر التي تحتوي على الكلاس 'main-button'
    document.querySelectorAll('.main-button').forEach((el) => {
        el.addEventListener('click', hideOthersAndFix);
    });

    // **********************************************************************

    //عند الضغط علي menuIcon 
    // إضافة مستمع لحدث الضغط على زر "menuIcon"
    // تعريف متغير لتتبع النقر على الأزرار الفرعية button-sub
    let actionOccurredOnSubButton = false;

    // إضافة مستمع للنقر على الأزرار داخل main-content1 و main-content2
    document.querySelectorAll('.button-sub').forEach(function (button) {
        button.addEventListener('click', function () {
            actionOccurredOnSubButton = true; // تم النقر على زر من الفئة button-sub
        });
    });

    // إضافة مستمع لحدث الضغط على زر "menuIcon"
    document.getElementById("menuIcon").addEventListener("click", function () {
        document.getElementById("menuIcon").style.display = 'none';
        // نتحقق إذا كانت الأذكار قد انتهت
        const finished = document.getElementById("finished").style.display !== 'none';
        // نتحقق مما إذا حدث أي نشاط على زر من الفئة button-sub
        const noActionOccurred = !actionOccurredOnSubButton; // إذا لم يتم النقر على أي زر من فئة button-sub

        // إذا لم يحدث أي نشاط على الأزرار الفرعية يتم الخروج مباشرة بدون رسالة
        if (noActionOccurred || finished) {
            exitWithoutConfirmation();
        } else {
            // إذا تم النقر على زر من فئة button-sub، نسأل المستخدم ما إذا كان يريد الخروج
            const userConfirmed = confirm("تم البدء في قراءة الذكر. هل تريد الخروج ؟");
            if (userConfirmed === true) {
                exitWithoutConfirmation();
            } else {
                // إعادة عرض القائمة إذا لم يؤكد المستخدم الخروج
                document.getElementById("menuIcon").style.display = 'block';
            }
        }
    });

    // دالة لتنفيذ الخروج بدون رساله تأكيد
    function exitWithoutConfirmation() {
        const allButtons = document.querySelectorAll('.main-button');
        document.body.style.paddingTop = '0px';
        document.getElementById("finished").style.display = 'none'; // اخفاء رسالة الانتهاء من الذكر
        document.getElementById("progress-container").style.display = 'none'; // إخفاء شريط التقديم 
        // عند الصغط علي الاسقوتة هيتم الذهاب الي اعلي الصفحة
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // للتأكد من أن التمرير سلس (اختياري)
        });
        // اخفاء جميع عناصر main-content1 , 2 , .........
        hideAll();

        // إذا كانت الأزرار مخفية، نقوم بإظهارها
        allButtons.forEach(function (element) {
            element.style.display = "block"; // إظهار الأزرار
            // إعادة وضع الزر الذي تم تثبيته إلى الوضع العادي
            element.style.position = '';
            element.style.top = '';
            element.style.left = '';
            element.style.transform = '';
            element.style.zIndex = '';
            element.style.margin = '';
            element.style.pointerEvents = 'auto'; // إعادة تفعيل الضغط على الزر
        });

        isButtonActive = true; // إعادة تفعيل الزر

        // إعادة تعيين حالة النقر على الأزرار
        actionOccurredOnSubButton = false;
    }
}



// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------

// دالة تشيك علي التحديث
// كود قديم اللي تحت افضل منه هي نفش الفكرة
// function checkUpdateNumber() {
//     if (localStorage.getItem("update") === null) { 
//         localStorage.setItem("update", 2);
//     } else if (localStorage.getItem("update") !== '2') {
//         alert("تم عمل تحديث للأصدار"); 

//         window.location.reload();
//         localStorage.removeItem('temporaryData');
//         localStorage.setItem("update", 2);

//     } 
// }

// دالة تشيك علي التحديث
// ممكن يحل محل الطريقة دي في التحديث وهي query parameters -- ?v=1.0.5">

function checkUpdateNumber() {
    // تعيين نسخة جديدة للتطبيق في localStorage
    const appVersion = '1.6.0';
    const savedVersion = localStorage.getItem('appVersion');

    if (savedVersion !== appVersion) {
        // مسح البيانات المؤقتة أو الكاش الخاص بالتطبيق فقط (وليس كل localStorage)
        alert("تم عمل تحديث للأصدار");
        window.location.reload();
        localStorage.removeItem('temporaryData');
        localStorage.setItem('appVersion', appVersion);  // تحديث بالقيمة الجديدة للأصدار

    }
}














