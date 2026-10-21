
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("sfNavbar");

    if (!navbar || typeof bootstrap === "undefined") return;

    const collapse = bootstrap.Collapse.getOrCreateInstance(navbar, {
        toggle: false
    });

    navbar.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth < 992) {
                collapse.hide();
            }
        });
    });

    const sections = document.querySelectorAll(
        "#top, #about, #services, #why-us, #process, #faq, #contact"
    );

    const links = navbar.querySelectorAll(".nav-link");

    function updateActiveLink() {
        let activeId = "top";

        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 160) {
                activeId = section.id;
            }
        });

        links.forEach(function (link) {
            const isActive = link.getAttribute("href") === "#" + activeId;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();
       const form = document.getElementById("sfContactForm");

    if (!form) return;

    const status = document.getElementById("sfContactStatus");
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name = document.getElementById("sfContactName").value.trim();
        const phone = document.getElementById("sfContactPhone").value.trim();
        const service = document.getElementById("sfContactService").value;
        const location = document.getElementById("sfContactLocation").value.trim();
        const message = document.getElementById("sfContactMessage").value.trim();

        if (!name || !phone || !service) {
            status.textContent = "يرجى استكمال الحقول المطلوبة قبل المتابعة.";
            status.className = "sf-contact-status is-error";
            return;
        }

        const whatsappMessage = [
            "السلام عليكم، أرغب في الاستفسار عن خدمات شركة الصفوة.",
            "",
            "الاسم: " + name,
            "رقم الجوال: " + phone,
            "الخدمة المطلوبة: " + service,
            "الموقع: " + (location || "لم يتم تحديد الموقع"),
            "تفاصيل الطلب: " + (message || "لا توجد تفاصيل إضافية")
        ].join("\n");

        const whatsappURL =
            "https://wa.me/966539661378?text=" +
            encodeURIComponent(whatsappMessage);

        const whatsappWindow = window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        if (whatsappWindow) {
            form.reset();
            status.textContent = "";
            status.className = "sf-contact-status";
        } else {
            status.textContent =
                "قد يكون المتصفح قد منع فتح واتساب. اسمح بالنوافذ المنبثقة وحاول مرة أخرى.";
            status.className = "sf-contact-status is-error";
        }
    });
        const yearElement = document.getElementById("sfFooterYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
