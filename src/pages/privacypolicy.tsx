import ReactMarkdown from 'react-markdown';
import { Box } from '@mui/material';
import Layout from '@/layout/Layout';
const PrivacyPolicy = () => {
  const PrivacyPolicy =
    '# Privacy Policy\n' +
    '\n' +
    'Last updated: [14.04.2023]\n' +
    '\n' +
    '## Introduction\n' +
    '\n' +
    'We at [Mert Sabinov] respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and disclose information about you when you use our [www.notes.wmte.io] (collectively, the "Services").\n' +
    '\n' +
    'By using the Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our Privacy Policy, do not use the Services.\n' +
    '\n' +
    '## Information We Collect\n' +
    '\n' +
    '### Personal Information\n' +
    '\n' +
    'We may collect personal information that you provide to us, such as your name and email address, when you register for an account or use certain features of the Services.\n' +
    '\n' +
    '### User Content\n' +
    '\n' +
    'We collect the notes and files that you create and save through the Services, as well as any other content that you upload or share through the Services.\n' +
    '\n' +
    '### User Interactions\n' +
    '\n' +
    'We may collect user feedback, comments, and reviews, as well as any other interactions that you have with other users of the Services.\n' +
    '\n' +
    '### Technical Information\n' +
    '\n' +
    'We automatically collect certain technical information about your use of the Services, such as your IP address, device type, operating system, and browser type. We may also collect information about your usage patterns and preferences.\n' +
    '\n' +
    '### Authentication\n' +
    '\n' +
    'We may collect information to verify the identity of our users, such as email addresses or phone numbers.\n' +
    '\n' +
    '## How We Use Your Information\n' +
    '\n' +
    'We may use the information we collect for various purposes, including:\n' +
    '\n' +
    '- Providing, maintaining, and improving the Services\n' +
    '- Responding to your questions, comments, and feedback\n' +
    '- Analyzing usage patterns and improving the user experience\n' +
    '- Verifying user identities and preventing fraud\n' +
    '- Providing customer support\n' +
    '- Communicating with you about updates, offers, and promotions\n' +
    '\n' +
    '## How We Share Your Information\n' +
    '\n' +
    'We may share your information with third-party service providers who perform services on our behalf, such as hosting and data analysis. We may also share your information with other users of the Services in order to provide collaborative features.\n' +
    '\n' +
    'We may also disclose your information if we believe that it is necessary to comply with a legal obligation or to protect our rights or the rights of others.\n' +
    '\n' +
    '## Data Retention\n' +
    '\n' +
    'We will retain your information for as long as necessary to provide the Services and to comply with our legal obligations, resolve disputes, and enforce our agreements.\n' +
    '\n' +
    '## Your Rights and Choices\n' +
    '\n' +
    'You may update or delete your personal information at any time by [in the settings page]. \n' +
    '\n' +
    '## Security\n' +
    '\n' +
    'We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee absolute security.\n' +
    '\n' +
    '## International Data Transfers\n' +
    '\n' +
    'Your information may be transferred to and processed in countries other than the country in which you are a resident. These countries may have data protection laws that are different from those of your country. By using the Services, you consent to the transfer of your information to these countries.\n' +
    '\n' +
    '## Changes to This Privacy Policy\n' +
    '\n' +
    'We may update this Privacy Policy from time to time.. You are advised to review this Privacy Policy periodically for any changes.\n' +
    '\n' +
    '## Contact Us\n' +
    '\n' +
    'If you have any questions or concerns about this Privacy Policy, please contact us at [support@wmte.io].\n' +
    '\n' +
    '## Firebase Services\n' +
    '\n' +
    "We use Firebase services to provide certain features of the Services, including user authentication, cloud storage, and analytics. Firebase may collect certain information about your use of the Services, such as your IP address, device type, operating system, and usage patterns. Firebase's privacy policy can be found here: [https://firebase.google.com/support/privacy].\n" +
    '\n' +
    '## Vercel Web Server\n' +
    '\n' +
    "We use Vercel web server to host our Services. Vercel may collect certain information about your use of the Services, such as your IP address and usage patterns. Vercel's privacy policy can be found here: [https://vercel.com/legal/privacy-policy].";

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
        <ReactMarkdown children={PrivacyPolicy} />
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
