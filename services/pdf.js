const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc
        .image("logo2.jpg", 50, 45, { width: 50 })
        .fillColor("black")
        .fontSize(20)
        .text("Route", 110, 57)
        .fontSize(10)
        .fillColor("black")
        .text("Route", 200, 50, { align: "right" })
        .text("rab3a nasr city", 200, 65, { align: "right" })
        .text("New York, NY, 10025", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Product", 50, 160);

    generateHr(doc, 185);

}

function generateInvoiceTable(doc, invoice) {
    let i;
    let invoiceTableTop = 250;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Product Title",
        "Product Desc",
        "price",

    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
    let idx = 0;
    for (i = 0; i < invoice.length; i++) {
        const item = invoice[i];
        idx += 1
        if (doc.y > 680) {

            idx = 0
            invoiceTableTop = 30
            doc.addPage()
        }
        const position = invoiceTableTop + idx * 30;

        generateTableRow(
            doc,
            position,
            item.productTitle,
            item.productDesc,
            item.price,
        );

        generateHr(doc, position + 20);

    }


}

function generateFooter(doc) {
    const date = new Date()
    doc
        .fontSize(10)
        .text(
            `this document for ${formatDate(date)}`,
            50,
            780, { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
) {

    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 150, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })

}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents) {
    return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    createInvoice
}