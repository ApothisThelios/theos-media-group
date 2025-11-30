// Mock Backend Services

export const subscribeToMailchimp = async (email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Subscribed ${email} to Mailchimp`);
      resolve(true);
    }, 1500);
  });
};

export const sendPressBlastToMediaList = async (title: string, content: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Press blast sent: ${title}`);
      resolve(true);
    }, 2000);
  });
};

export const fetchStripeFunnelData = async () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        totalRevenue: 14520.50,
        conversionRate: 4.2,
        visitors: 12050
      });
    }, 1000);
  });
};

export const fetchBountyData = async () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { code: 'AMB-291', sales: 14, payout: 420 },
        { code: 'AMB-882', sales: 8, payout: 240 },
        { code: 'AMB-101', sales: 32, payout: 960 },
      ]);
    }, 800);
  });
};