import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { pdf } from '@react-pdf/renderer'
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>User</Text>
      </View>
    </Page>
  </Document>
);

export default function Home() {
  const handleDownload = async () => {
    const blob = await pdf(<MyDocument />).toBlob()
    saveAs(blob, 'untitled.pdf')
  }
  return (
    <>
    <h1> Hello world </h1>
    <button onClick={handleDownload}>Download</button>
   </>
  )
}
