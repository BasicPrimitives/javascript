// create a document and pipe to a blob
var doc = new PDFDocument();
var stream = doc.pipe(blobStream());

doc.fontSize(25)
	.text('User Item Template', 100, 100);

// See http://dataurl.net/#dataurlmaker for image to data url conversion
var photo1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALaSURBVHhe7ZTBUeNAAAQVCxlQxZc0uB8ZkABfR3FFAORABoRACkRxSB6Nxm1hmeKBj5qu/tgedN6+haGUcjn8fXuvqypQgkW1CpRgUa0CJVhUq0AJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKlGBRrQIlWFSrQAkW1SpQgkW1CpRgUa0CJVhUq0AJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKlGBRrQIlWFSrQAkW1SpQgkW1CpRgUa0CJVhUq0AJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKlGBRrQIlWFSrQAkW1SpQgkW1CpRgUa0CJVh8393jzTDcPxy9/9+pQAkWZ/l0rx+euXp89ac/Hev17nr8SrdPeP/LTic7BIuzHGPd3L3ky2H487x/+a1YePJXjf/FS4319v7w5+NJCvRjsV52V/s7PiW73FhTIL0zx3q+1b9w8Es6Op3KzKfSr8/CfFU/2X/uhcc6ull8uXz16SRLPhzs6Mkb+1XP2Zzhx0MIFmd5eKR9Dp8nb9nkeMXmT6fr4yszOYa+3u32Lxlra7/q5cVKDu7C/Gvod+LA/rOyfHoYF7E296teXqxPv+5mLB4jn7YW69R+1d8Uqzdr8VSszb9BfPLWftXfEmv/6XISvDy+Shv7VX9NrNHpMDN8zj7HiH/k5H5xCk1O38GT6gkJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKlGBRrQIlWFSrQAkW1SpQgkW1CpRgUa0CJVhUq0AJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKlGBRrQIlWFSrQAkW1SpQgkW1CpRgUa0CJVhUq0AJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKlGBRrQIlWFSrQAkW1SpQgkW1CpRgUa0CJVhUq0AJFtUqUIJFtQqUYFGtAiVYVKtACRbVKlCCRbUKVEr5cYbhH4pgzY+N7yq4AAAAAElFTkSuQmCC';
var photo2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMaSURBVHhe7du/SxthHMfxb/tHXCkdQiLtgShUCDjpEgjUDt1qC8XQQQItnRoQAnGwEBDcBOFwMgg2bh2qIByUOAkHGSpCBnNk6ND8Fb0fT+4uJeH8hKcJls+LgHeXR7h753nuskSIaNYeqL8iVqevtmhY2TTCjYfhH7oLxgIwFoCxAIwFYCwAYwEYC8BYAMYCMBaAsQCMBWAsAGMBGAvAWADGAjAWgLEAjAVgLABjARgLwFgAxgIwFoCxAIwFYCwAYwEYC8BYAMYCMBaAsQCMBWAsgP5Y/aO1slm5Vnv/lYlitSpl00i+do9c9dYsufabxFlt2+qwPhPPrPzri77VCV6HG936sp6T8z+GNbun9iDX28unz06iU5LmW+29dCzD1b1P6yLN89kuvYWdvrVTUDv/5pT03LOMubzIze+hGWEfj1ukPWs3WiymcdwKjwaLaLMh4pwWg7eieTF6fIrglDTTE6t/64jMP8qoXZHGvnn+PFgRX6p5b5HGV+gttGJNqlfRerncDK8/W/gaLJ9ogYfTZOz4FMEpaaYhlvf4229KrvpxQR3weBe8F+4apc8rIr/ccHK59kFD1k+2StlgV62XywNrzI+s0PEDPev736ekwcSxBovFNGp18eZCfD2+5CzLPV6S7m3X3+xdOG3JzeWC44q/Xtrffo68qaPjFdfeqnVl4+XQKWkwcazE07BzVojTpHuSHboGIzuvtsZAx/uPxXY8tTXSc8+CDJak0ndv1NYY0PjwnrByiH1+dzTdWJliPlqSA/6deOnV4shrA8d7pWp1J1e9ereqjug15ZmVXXyR974uRo8zNRE+lNVvRTNPc+I4P6KplDY+qVUJSw3fPXWa9jI0Smfh4z/5cIgnQqb8Pviq4b8bfM9KGR8Lnpsi6n+jl9Yv8fyNdDovergxgxv8/cVYAMYCMBaAsQCMBWAsAGMBGAvAWADGAjAWgLEAjAVgLABjARgLwFgAxgIwFoCxAIwFYCwAYwEYC8BYAMYCMBaAsQCMBWAsAGMBGAvAWADGAjAWgLEAjAVgLABjARiLiO4PkT8psDJAAggo9gAAAABJRU5ErkJggg==';
var photo3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAOYSURBVHhe7ZzBS9tgGMaf7Y/oGB5K6zZBFCYUPOmlUNDLbnOCTMaQwsZOEwaCHhQEwZtMkLGDIji97aIgFIaeBgEPE6FjtngYY/0nti/JV5tE17qlqY/s+UFskuYTkt/3Pt/rwdwC8MtsgoTb9lOQICFkhCJrrVyze6KTFHtSdk8VQoeEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkHFtQmrroyj2TOPYHguf9gs5mPb+7zq6La1X7QU3hSpKT6L3kfwESqhCcni8X/NeROBt756isjiI4lzJfp8A3kQYRenMHsfkeG4Qzsjnxj2UtzCEDawkLKUzkTW8jFdj5nN778ZEVN98DW8mM/bIJY/CTM58nuBnm6RfRsfWkFT3n26mhM1ALFwabWdrWApc426bB/a7erRMbZh9BzsFe02wGpuO56JjQmqnjvnZiztp/9jHjYA9PLSxsGBmoBttoYflRlFhFpgJxIeJwMOp+kPNIP/BPxeKyvm8++UVxl8R83tmFx1kZ94iH7qH9tIRIW5HtbINczMv0WfP+bgPcPn8XGrytclp4Hu1XiVm9q+amT+2FY4PG4GHq2to/rqcOOMji7qpwKyRGo6x9pOQkEB0mG12Ed7MvXgz0YrJ4u4AUDmt+Idn+3COzNnurH8cwIvAo4/40izPY423lVevKrOod7mNSRsbh8tISEikyyrvxirzrszFWZnK9Nq91sQd75PHhNdpmcn2PrlusWNrSBwaEdagVj2xe62JO76BX8H4+q1FVP473ELSBeSCERbAaxIGHqG/WeXFHX+BCn6YCMSDe2i8cqy9kFdIBv0jJuu3x0MdUb1JGHpRbDyY9H0zfx04n4LV8BfjQ/iteLgLcxf5cRy6cfzcdnAJQB9Zqcnd8zY12iRMDNuLXNJFPLNts3ed/TvkyuNDmPUiMqbYM4gdLGAh5nrYCr1zkQBXeJ0bsaj/T0gIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkSAgZEkKGhJAhIWRICBkSQoaEkCEhZEgIGRJChoSQISFkhN7kIK4fVQgZEkIF8Bu8fEDKN7ru0wAAAABJRU5ErkJggg==';

var firstOrganizationalChartSample = primitives.pdf.orgdiagram.Plugin({
	items: [
		new primitives.orgdiagram.ItemConfig({
			id: 0,
			parent: null,
			title: "Scott Aasrud",
			description: "VP, Public Sector",
			image: photo1,
			templateName: "contactTemplate",
			link: "http://www.basicprimitives.com?userid=0"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 1,
			parent: 0,
			title: "Ted Lucas",
			description: "VP, Human Resources",
			image: photo2,
			templateName: "contactTemplate",
            link: "http://www.basicprimitives.com?userid=1"
		}),
		new primitives.orgdiagram.ItemConfig({
			id: 2,
			parent: 0,
			title: "Fritz Stuger",
			description: "Business Solutions, US",
			image: photo3,
			templateName: "contactTemplate",
			link: "http://www.basicprimitives.com?userid=2"
		})
	],
	cursorItem: null,
	hasSelectorCheckbox: primitives.common.Enabled.False,
	templates: [getContactTemplate()],
	onItemRender: onTemplateRender
});

function getContactTemplate() {
	var result = new primitives.orgdiagram.TemplateConfig();
	result.name = "contactTemplate";
	result.itemTemplate = "Use onItemRener method.";
	result.itemSize = new primitives.common.Size(220, 108);
	result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
	return result;
}

function onTemplateRender(doc, position, data) {
	var itemConfig = data.context;

	if (data.templateName == "contactTemplate") {
		var contentSize = new primitives.common.Size(220, 108);

		contentSize.width -= 2;
		contentSize.height -= 2;

		doc.save();

		/* item border */
		doc.roundedRect(position.x, position.y, position.width, position.height, 0)
			.lineWidth(1)
			.stroke('#dddddd');

		/* photo */
		if (itemConfig.image != null) {
			doc.image(itemConfig.image, position.x + 3, position.y + 3);
		}

		/* title */
		doc.fillColor('Black')
			.font('Helvetica', 12)
			.text(itemConfig.title, position.x + 110, position.y + 7, {
				ellipsis: true,
				width: (contentSize.width - 4 - 110),
				height: 16,
				align: 'center'
			});

		/* description */
		doc.fillColor('black')
			.font('Helvetica', 10)
			.text(itemConfig.description, position.x + 110, position.y + 24, {
				ellipsis: true,
				width: (contentSize.width - 4 - 110),
				height: 74,
				align: 'left'
			});

	    /* readmore */
		doc.fillColor('black')
			.font('Helvetica', 10)
			.text('Link Annotation ...', position.x + 110, position.y + 94, {
			    ellipsis: false,
			    width: (contentSize.width - 4 - 110),
			    height: 24,
			    align: 'right',
			    link: itemConfig.link,
                underline: true
			});

		doc.restore();
	}
}



var size = firstOrganizationalChartSample.draw(doc, 100, 150);

doc.restore();

doc.end();