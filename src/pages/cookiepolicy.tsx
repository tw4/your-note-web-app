import ReactMarkdown from 'react-markdown';
import { Box } from '@mui/material';
import Layout from '@/layout/Layout';
const CookiePolicy = () => {
  const cookiePolicy =
    '# COOKIE POLICY\n' +
    '\n' +
    'This Cookie Policy applies to the website located at https://notes.wmte.io/ (the "Site"), which is owned and operated by "we," "us," or "our". By accessing or using the Site, you consent to the use of cookies as described in this policy.\n' +
    '\n' +
    '## What Are Cookies?\n' +
    '\n' +
    "Cookies are small text files that a website or its service provider transfers to your device through your web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.\n" +
    '\n' +
    '## Types of Cookies We Use\n' +
    '\n' +
    'We use only necessary cookies on our Site. These cookies are essential for enabling user authentication and to ensure the proper functioning of our Site.\n' +
    '\n' +
    '## How We Use Cookies\n' +
    '\n' +
    'We use cookies to authenticate user logins and to ensure that users can access and use our Site. We do not use cookies to track user activity or to collect personal information about our users.\n' +
    '\n' +
    '## How Long We Retain Cookies\n' +
    '\n' +
    "We retain cookies until they are deleted by the user's browser.\n" +
    '\n' +
    '## Third-Party Cookies\n' +
    '\n' +
    'We do not use third-party cookies on our Site.\n' +
    '\n' +
    '## Managing Cookies\n' +
    '\n' +
    'Users can refuse to accept cookies or delete them by adjusting their web browser settings. Please note that by disabling cookies, users may not be able to access all the features of our Site.\n' +
    '\n' +
    '## Updates to Our Cookie Policy\n' +
    '\n' +
    'We reserve the right to amend this Cookie Policy at any time, without notice, and encourage you to check back regularly for updates.\n' +
    '\n' +
    '## Disclaimer\n' +
    '\n' +
    'We do not accept any responsibility or liability for the use of cookies on other websites that you may access through hyperlinks on our Site.\n' +
    '\n' +
    'For more information about our data protection and privacy policies, please refer to our End User License Agreement (EULA).\n';
  return (
    <Layout>
      <Box
        color="white"
        textAlign="start"
        sx={{
          marginLeft: { xs: '5%', md: '10%' },
          marginRight: { xs: '5%', md: '10%' },
        }}
      >
        <ReactMarkdown children={cookiePolicy} />
      </Box>
    </Layout>
  );
};

export default CookiePolicy;
