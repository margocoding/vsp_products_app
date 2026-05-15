import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 sm:mt-12">
      <div className="bg-white/3 backdrop-blur-xl border-t border-white/8">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-900/70 to-red-950/70 flex items-center justify-center shadow-md shadow-red-950/20">
                  <span className="text-white font-bold text-base sm:text-lg">Л</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100">ООО «ЛСК-НН»</h3>
                  <p className="text-xs text-zinc-400 hidden sm:block">Железнодорожные материалы ВСП</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Поставка железнодорожных материалов и комплектующих верхнего строения пути.
                Работаем по всей России.
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-zinc-100 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Адрес</h4>
              <div className="flex items-start gap-2 sm:gap-3 text-zinc-400">
                <MapPin size={16} className="sm:w-4 sm:h-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">
                  125130, г. Москва,<br />
                  ул. Зои и Александра Космодемьянских,<br />
                  д. 10, кв. 216
                </span>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="text-zinc-100 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Контакты</h4>
              <div className="space-y-2 sm:space-y-3">
                <a 
                  href="tel:+79995448055"
                  className="flex items-center gap-2 sm:gap-3 text-zinc-400 hover:text-red-300 transition-colors duration-200 group"
                >
                  <Phone size={16} className="sm:w-4 sm:h-4 text-red-400/80 group-hover:text-red-300 flex-shrink-0" />
                  <span className="text-sm">+7 999 544 80 55</span>
                </a>
                <a 
                  href="mailto:vsp@lsknn.ru"
                  className="flex items-center gap-2 sm:gap-3 text-zinc-400 hover:text-red-300 transition-colors duration-200 group"
                >
                  <Mail size={16} className="sm:w-4 sm:h-4 text-red-400/80 group-hover:text-red-300 flex-shrink-0" />
                  <span className="text-sm">vsp@lsknn.ru</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/8">
            <p className="text-center text-zinc-500 text-xs sm:text-sm">
              © 2026 ООО «ЛСК-НН». Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
