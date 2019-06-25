/*pdf loading and browsing utilities*/
var pdfState = {
	pdf: null,
	currentPageIndex: 1,
	zoomLevel: 1
}

function render() {
	pdfState.pdf.getPage(pdfState.currentPageIndex).then((page) => {
		var canvas = document.getElementById("pdf_renderer");
		var ctx = canvas.getContext('2d');
		var viewport = page.getViewport(pdfState.zoomLevel);
		canvas.width = viewport.width;
		canvas.height = viewport.height;
		page.render({
			canvasContext: ctx,
			viewport: viewport
		});

	});
}


document.getElementById('pdf_file_selector').addEventListener('change', function(e){
	pdfjsLib.getDocument(URL.createObjectURL(document.getElementById('pdf_file_selector').files[0])).then(function (pdf) {
	pdfState.pdf = pdf;
	render();
});

});

document.getElementById('navigate_to_previous_page')
.addEventListener('click', (e) => {
	if (pdfState.pdf == null || pdfState.currentPageIndex == 1)
		return;
	pdfState.currentPageIndex -= 1;
	document.getElementById("focused_page_index")
	.value = pdfState.currentPageIndex;
	render();
});

document.getElementById('navigate_to_next_page')
.addEventListener('click', (e) => {
	if (pdfState.pdf == null || pdfState.currentPageIndex > pdfState.pdf
		._pdfInfo.numPages)
		return;
	pdfState.currentPageIndex += 1;
	document.getElementById("focused_page_index")
	.value = pdfState.currentPageIndex;
	render();
});

document.getElementById('focused_page_index')
.addEventListener('keypress', (e) => {
	if (pdfState.pdf == null)
		return;

	// Get key code
	var code = (e.keyCode ? e.keyCode : e.which);

	// If key code matches that of the Enter key
	if (code == 13) {
		var desiredPage =
			document.getElementById('focused_page_index')
			.valueAsNumber;

		if (desiredPage >= 1
			 && desiredPage <= pdfState.pdf
			._pdfInfo.numPages) {
			pdfState.currentPageIndex = desiredPage;
			document.getElementById("focused_page_index")
			.value = desiredPage;
			render();
		}
	}
});
document.getElementById('zoom_in')
.addEventListener('click', (e) => {
	if (pdfState.pdf == null)
		return;
	pdfState.zoomLevel += 0.25;
	render();
});

document.getElementById('zoom_out')
.addEventListener('click', (e) => {
	if (pdfState.pdf == null)
		return;
	pdfState.zoomLevel -= 0.25;
	render();
});
