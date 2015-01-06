function MwlRequest()
{ // make sure that patient DOB and sex returned by MWL (if MWL holder supports them)
DicomObj.SetTag("00100030,DA","");
DicomObj.SetTag("00100040,CS","");
// This is the trick - as there is no way to pass patient name to Study C-FIND
// reserve some other PN element for patient name, for example, referring physician
DicomObj.SetTag("00080090,PN","");
return 'Y';
}

function MwlResponse()
{
	// Replace the reserved tag with the patient name
	//DicomObjAux.SetTag("00080090,PN",DicomObj.GetTag("00100010,PN"));

	var pname = DicomObj.GetTag("00100010,PN");
	DicomObj.SetTag("00080090,PN", pname);
	return 'Y';
}

function StudyRequest()
{
DicomObj.SetTag("00100020,LO",""); // Remove patient ID
// Insert tha patient name from the reserved tag
var fname = DicomObjAux.GetTag("00080090,PN");
fname = fname.substr(0, fname.indexOf("^") + 2);
fname = fname + "*";

//DicomObj.SetTag("00100010,PN",DicomObjAux.GetTag("00080090,PN"));
DicomObj.SetTag("00100010,PN",fname);

// Insert patient DOB and sex if available
DicomObj.SetTag("00100030,DA",DicomObjAux.GetTag("00100030,DA"));
DicomObj.SetTag("00100040,CS",DicomObjAux.GetTag("00100040,CS"));
return 'Y';
}