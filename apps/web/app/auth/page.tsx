import React, { Suspense } from "react";
import { Container } from "@sk/ui";
import { AuthClient } from "./auth-client";

export default function AuthPage() {
  return (
    <div className="py-10">
      <Container>
        <Suspense
          fallback={
            <div className="max-w-[520px]">
              <div className="text-[28px] font-semibold text-[#26292e]">
                Вход
              </div>
              <div className="mt-2 text-[#26292e]/60">Загрузка…</div>
            </div>
          }
        >
          <AuthClient />
        </Suspense>
      </Container>
    </div>
  );
}

