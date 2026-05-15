import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12">
      <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-[1920px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-crimson flex items-center justify-center shadow-lg shadow-red-500/30">
                  <span className="text-white font-bold text-lg">Л</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">ООО «ЛСК-НН»</h3>
                  <p className="text-xs text-zinc-400">Железнодорожные материалы ВСП</p>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Поставка железнодорожных материалов и комплектующих верхнего строения пути.
                Работаем по всей России.
              </p>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-zinc-100 font-semibold mb-4">Адрес</h4>
              <div className="flex items-start gap-3 text-zinc-400">
                <MapPin size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  125130, г. Москва,<br />
                  ул. Зои и Александра Космодемьянских,<br />
                  д. 10, кв. 216
                </span>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="text-zinc-100 font-semibold mb-4">Контакты</h4>
              <div className="space-y-3">
                <a 
                  href="tel:+79995448055"
                  className="flex items-center gap-3 text-zinc-400 hover:text-red-400 transition-colors duration-300 group"
                >
                  <Phone size={18} className="text-red-400 group-hover:text-red-300 flex-shrink-0" />
                  <span className="text-sm">+7 999 544 80 55</span>
                </a>
                <a 
                  href="mailto:vsp@lsknn.ru"
                  className="flex items-center gap-3 text-zinc-400 hover:text-red-400 transition-colors duration-300 group"
                >
                  <Mail size={18} className="text-red-400 group-hover:text-red-300 flex-shrink-0" />
                  <span className="text-sm">vsp@lsknn.ru</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-zinc-500 text-sm">
              © 2026 ООО «ЛСК-НН». Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
