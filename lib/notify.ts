/**
 * Notification helpers — admin pings when inquiries / orders / membership
 * events fire. v1 is email only (no Telegram or Lark, unlike aio-website).
 *
 * notifyNewInquiry(inquiry) is the contract Stream A's /api/contacts handler
 * calls after submit_inquiry RPC succeeds. The InquiryDetail shape mirrors
 * what the RPC returns; if Stream A's shape diverges, reconcile here at merge.
 */

import { render } from '@react-email/render'
import InquiryNotification, {
  type InquiryDetail,
} from '@/emails/InquiryNotification'
import { sendEmailNotification } from '@/lib/email'

export type { InquiryDetail }

export async function notifyNewInquiry(inquiry: InquiryDetail) {
  const name = inquiry.person_name || inquiry.person_email
  const html = await render(InquiryNotification({ inquiry }))

  return sendEmailNotification({
    subject: `[${inquiry.type}] New inquiry: ${name}`,
    html,
  })
}
