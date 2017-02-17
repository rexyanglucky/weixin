var Lui=require('../../LUI/js/lui');
var tool=require('../../LUI/tool');
var lui=new Lui();
//本月本季的时间选择
tool.Sibs($('.header .span'));

//全部教学点下拉
lui.initDropDownList({ warpid: "drop_demo1", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
lui.initDropDownList({ warpid: "drop_demo2", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
