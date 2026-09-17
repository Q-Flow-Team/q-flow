import axios from 'axios';

interface SMSPayload {
  recipient: string; // e.g., "0241234567" or "233241234567"
  message: string;
}

export async function sendSMSNotification({ recipient, message }: SMSPayload): Promise<boolean> {
  const apiKey = process.env.BMS_API_KEY;
  const senderId = process.env.BMS_SENDER_ID || 'QFlow';

  try {
    const response = await axios.post(
      'https://api.bms.africa/v1/sms/quick',
      {
        recipient: [recipient],
        sender: senderId,
        message: message,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.data && response.data.status === 'success') {
      return true;
    }

    console.warn('BMS Response:', response.data);
    return false;
  } catch (error: any) {
    console.error('BMS SMS Error:', error.response?.data || error.message);
    return false;
  }
}