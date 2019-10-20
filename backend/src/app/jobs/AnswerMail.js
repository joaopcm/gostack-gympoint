import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Pedido de auxílio respondido',
      template: 'answer',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        created_at: format(
          parseISO(helpOrder.createdAt),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        answer_at: format(
          parseISO(helpOrder.answer_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
