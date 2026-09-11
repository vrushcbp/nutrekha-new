/**
 * Nutrekha Consultation & Business Enquiry Lead Delivery Service
 *
 * Provider: Web3Forms Free (https://web3forms.com)
 * Confirmed Recipient: gouri@nutrekha.com
 * (Note: care@nutrekha.com is strictly NOT to be used for consultation leads)
 *
 * Architecture:
 * Client UI (BookingConsultationModal)
 *   -> consultationService.js
 *   -> Web3Forms API Endpoint (https://api.web3forms.com/submit)
 *   -> Confirmed Business Mailbox (gouri@nutrekha.com)
 *
 * Security:
 * - Public Access Key is loaded via Vite environment variables (VITE_WEB3FORMS_ACCESS_KEY).
 * - No private SMTP credentials, backend secrets, or passwords exist in frontend code.
 * - Honeypot bot detection is natively integrated via the "botcheck" field.
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const CONFIRMED_LEAD_RECIPIENT = 'gouri@nutrekha.com';
const DEFAULT_TIMEOUT_MS = 10000;

/**
 * Retrieves and validates the Web3Forms Access Key from environment variables.
 * @returns {string|null} The valid access key, or null if unconfigured/placeholder.
 */
export function getWeb3FormsAccessKey() {
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!key || typeof key !== 'string') {
    return null;
  }
  const trimmed = key.trim();
  if (
    !trimmed ||
    trimmed.includes('YOUR_ACCESS_KEY') ||
    trimmed.includes('your_access_key') ||
    trimmed.length < 10
  ) {
    return null;
  }
  return trimmed;
}

/**
 * Submits a consultation lead via Web3Forms to gouri@nutrekha.com.
 *
 * @param {Object} leadData
 * @param {string} leadData.name - Client full name
 * @param {string} leadData.phone - Client phone / WhatsApp
 * @param {string} [leadData.email] - Client email (optional)
 * @param {string} leadData.service - Selected nutrition program
 * @param {string} leadData.preferredTime - Preferred consultation time slot
 * @param {string} [leadData.message] - Health goals or questions
 * @param {string} [leadData.botcheck] - Honeypot field (must be empty)
 *
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitConsultationLead(leadData) {
  const accessKey = getWeb3FormsAccessKey();

  if (!accessKey) {
    // If access key is not configured, gracefully notify without faking success.
    return {
      success: false,
      error: 'Consultation service is temporarily unavailable. Please contact us via phone or WhatsApp at +91 7676482879.',
    };
  }

  // Detect spam bots filling the honeypot
  if (leadData.botcheck || leadData._gotcha) {
    return {
      success: false,
      error: 'Submission could not be processed. Please try again.',
    };
  }

  const program = leadData.service || 'General Consultation';

  // Standard email subject format required: [Nutrekha Lead] New Consultation — {Selected Program}
  const subject = `[Nutrekha Lead] New Consultation — ${program}`;

  const payload = {
    access_key: accessKey,
    subject: subject,
    from_name: 'Nutrekha Consultation Form',
    'Client Name': leadData.name?.trim() || '',
    'Phone / WhatsApp': leadData.phone?.trim() || '',
    'Email': leadData.email?.trim() || 'Not provided',
    'Selected Program': program,
    'Preferred Time Slot': leadData.preferredTime || 'Not specified',
    'Health Goals / Questions': leadData.message?.trim() || 'None provided',
    'Source': 'Nutrekha Website',
    'Submitted At': new Date().toISOString(),
    botcheck: '',
  };

  // If client provided a valid email, set replyto so Gouri can directly reply to the enquiry
  if (leadData.email?.trim()) {
    payload.replyto = leadData.email.trim();
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let data = null;
    try {
      data = await response.json();
    } catch {
      // Non-JSON response
    }

    if (response.ok && data && data.success) {
      return { success: true };
    }

    const providerMessage = data?.message;
    return {
      success: false,
      error: providerMessage || 'Unable to submit your consultation request at this time. Please try again.',
    };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'The request timed out. Please check your network connection and try again.',
      };
    }

    return {
      success: false,
      error: 'A network error occurred. Please check your connection and try again.',
    };
  }
}
