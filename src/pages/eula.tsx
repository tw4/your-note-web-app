import ReactMarkdown from 'react-markdown';
import { Box } from '@mui/material';
import Layout from '@/layout/Layout';
const Eula = () => {
  const EULA =
    'END-USER LICENSE AGREEMENT (EULA)\n' +
    '\n' +
    'Please read this License Agreement carefully. By using or installing this software, you agree to comply with the following terms.\n' +
    '\n' +
    '1. License. You, as the user, are granted a limited, personal, nontransferable license without any copyright or other intellectual property rights to use this software. This license is valid by installing or using a copy of the software.\n' +
    '\n' +
    '2. Limitations. The use of this software is subject to the following limitations:\n' +
    '    a. The owner or developer of the software has the right to terminate the project and cease support at any time without notice.\n' +
    '\n' +
    '3. Copyright. All copyrights and other intellectual property rights to this software belong to the developer of the software.\n' +
    '\n' +
    '4. Disclaimer of Warranty. This software is provided without any express or implied warranty. Your use of the software is at your own risk. No warranty or guarantee is made regarding the accuracy, reliability, or performance of this software.\n' +
    '\n' +
    '5. Limited Liability. We are not liable for any direct, indirect, special, consequential, or punitive damages arising out of or in connection with the use of this software.\n' +
    '\n' +
    '6. Termination. This license may be terminated in the event of any breach, including the right to discontinue the use of the software at any time.\n' +
    '\n' +
    '7. Applicable Law. This license agreement is governed by Canadian laws, and any dispute arising out of or in connection with the use of this software will be resolved using such laws.\n' +
    '\n' +
    '8. Acceptance. By installing or using this software, you agree to these terms and conditions.\n' +
    '\n';

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

export default Eula;
