// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SpaceDivider } from '@/components/pdf/layout';
import { DataTableCell, Table, TableBody, TableCell } from '@david.kucsai/react-pdf-table';
import { TableHeader } from '@david.kucsai/react-pdf-table/lib/TableHeader';
import ReactPDF, { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { NextApiRequest, NextApiResponse } from 'next';

const data = require("../../../data.json");

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 8,
        padding: 10,
    },
    sectionHeader: {
        marginVertical: 8
    },
    userText: {
        fontSize: "10px",
        marginVertical: 4
    },
    cellText: {
        fontSize: "12px",
        padding: 4
    }
});
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page} >
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>User</Text>
                    <SpaceDivider heightValue={10} hasBorder />
                    <Text style={styles.userText}>
                        Reference: {data.reference}
                    </Text>
                    <Text style={styles.userText}>
                        Name: {data.user.firstName} {data.user.lastName}
                    </Text>
                    <Text style={styles.userText}>
                        Email: {data.user.email}
                    </Text>
                    <Text style={styles.userText}>
                        Phone: {data.user.phone}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text>Business</Text>
                    <SpaceDivider heightValue={10} hasBorder />
                    <Text style={styles.userText}>
                        name: {data.business.name}
                    </Text>
                    <Text style={styles.userText}>
                        industry: {data.business.industry}
                    </Text>
                    <Text style={styles.userText}>
                        registrationNumber: {data.business.registrationNumber}
                    </Text>
                    <Text style={styles.userText}>
                        estimatedAnnualTurnover: {data.business.estimatedAnnualTurnover}
                    </Text>
                    <Text style={styles.userText}>
                        description: {data.business.description}
                    </Text>
                    <Text style={styles.userText}>
                        Business Street Address: {data.business.addressLine1}
                    </Text>
                    <Text style={styles.userText}>
                        Address Line: {data.business.addressLine2}
                    </Text>
                    <Text style={styles.userText}>
                        postalCode: {data.business.postalCode}
                    </Text>
                    <Text style={styles.userText}>
                        city: {data.business.city}
                    </Text>
                    <Text style={styles.userText}>
                        province: {data.business.province}
                    </Text>
                    <Text style={styles.userText}>
                        Have Insurance?: {data.business.existingInsurance ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.userText}>
                        Generate Quote from Current Insurer's Schedule: {data.business.generateQuoteFromExisting ? 'Yes' : 'No'}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text>Recent Claims</Text>
                    <SpaceDivider heightValue={10} hasBorder />
                    <SpaceDivider heightValue={10} />
                    <Table data={data.business.recentClaims}>
                        <TableHeader>
                            <TableCell>
                                <Text style={styles.cellText}>
                                    Description
                                </Text>
                            </TableCell>
                            <TableCell>
                                <Text style={styles.cellText}>
                                    Value in USD
                                </Text>
                            </TableCell>
                            <TableCell>
                                <Text style={styles.cellText}>
                                    Type
                                </Text>
                            </TableCell>
                            <TableCell>
                                <Text style={styles.cellText}>
                                    Date
                                </Text>
                            </TableCell>
                        </TableHeader>
                        <TableBody>
                            <DataTableCell getContent={r =>
                                <Text style={styles.cellText}>
                                    {r.description}</Text>
                            }
                            />


                            <DataTableCell getContent={r =>
                                <Text style={styles.cellText}>
                                    {r.value}</Text>
                            }
                            />


                            <DataTableCell getContent={r =>
                                <Text style={styles.cellText}>
                                    {r.type}</Text>
                            }
                            />


                            <DataTableCell getContent={r =>
                                <Text style={styles.cellText}>
                                    {r.date}</Text>
                            }
                            />

                        </TableBody>
                    </Table>

                </View>

            </Page>
        </Document>
    );
    const pdfStream = await ReactPDF.renderToStream(<MyDocument />)
    res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-disposition', 'attachment;filename="filename.pdf"')
    res.setHeader('Content-disposition', 'inline;filename="filename.pdf"')
    res.send(pdfStream)

}
