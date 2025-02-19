const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google-callback`;

export const getGoogleOAuthURL = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    // access_type: 'offline',
    response_type: 'id_token token',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    nonce: generateNonce(),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};
// Generate a random nonce for security
const generateNonce = () => {
    const rand = new Uint32Array(2);
    crypto.getRandomValues(rand);
    return rand.join('');
  };
  

export const getGoogleTokens = async (code: string) => {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
      code: code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      scope: [
        // 'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(values),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token Exchange Error:', errorData);
        throw new Error(errorData.error_description || 'Failed to get tokens');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting Google tokens:', error);
      throw error;
    }
  };

export const getGoogleUser = async (access_token: string): Promise<GoogleUser> => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting Google user:', error);
    throw new Error('Failed to get Google user');
  }
};
