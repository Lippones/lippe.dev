import { GuestBook } from './guest-book'

export default function Page() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-screen-2xl px-4 py-10 md:px-8">
      <h1 className="text-4xl font-bold">Guestbook</h1>
      <p className="mt-2 max-w-[800px] text-pretty text-sm text-muted-foreground">
        Olá, espero que tenha gostado do meu site, deixe seu rastro aqui, caso
        não saiba o que falar, apenas deixe uma piada. Estou aberto a sugestões
        e críticas construtivas.
      </p>
      <GuestBook />
    </div>
  )
}
