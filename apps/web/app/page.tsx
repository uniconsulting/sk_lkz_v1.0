'use client';

import { Header } from '@sk/ui';
import { Container, Card } from '@sk/ui';
import { SiteLogo } from '../components/site-logo';

export default function HomePage() {
  return (
    <div>
      <Header
        logoSlot={<SiteLogo />}
        nav={[
          { label: 'как заказать', href: '#how' },
          { label: 'купить оптом', href: '#b2b' },
          { label: 'дилерам', href: '#dealers' },
          { label: 'блог и новости', href: '#blog' },
        ]}
        regionLabel="Ульяновск"
        phoneLabel="+7 (964) 858-99-10"
        phoneHref="tel:+79648589910"
      />

      <main className="py-6">
        <Container>
          <Card className="p-0 overflow-hidden">
            <div className="w-full" style={{ height: 400 }}>
              <div className="h-full w-full flex items-center justify-center text-fg/60">
                Баннер 1416×400 (карусель из админки) - заглушка
              </div>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
