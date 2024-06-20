import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

interface ContactEmailProps {
  email: string
  message: string
}

export const ContactEmail = ({ email, message }: ContactEmailProps) => {
  const previewText = `${email}, entrou em contrato pelo site.`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Dados
            </Heading>
            <Text className="text-black flex flex-col text-[14px] leading-[24px]">
              <strong>Email:</strong> {email}
              <strong>Mensagem:</strong> {message}
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              O email do remetente é <span className="text-black">{email}</span>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ContactEmail.PreviewProps = {
  email: 'filipe68ft@hotmail.com',
  message: 'Olá, tudo bem?',
  location: 'São Paulo, Brasil',
} as ContactEmailProps

export default ContactEmail
