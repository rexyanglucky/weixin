﻿{{each}}

            
                <tr>
                    <td>{{$value.StuName}}</td>
                    <td>{{$value.LoginId}}</td>
                  
                    
					{{include './StuClassList' $value.StuClassList}}
                    <td>
                        <span class="inline operatBtn seeDetail" data-id="{{$value.StuId}}-{{$value.EditionId}}">查看详情</span>

						 {{if $value.ClassCount==0}}
            <span class="inline operatBtn  continue" data-id="{{$value.StuId}}-{{$value.StuName}}-{{$value.GradeId}}-{{$value.SchoolId}}-{{$value.EditionId}}" >报课</span>
                {{else}}
           	<span class="inline operatBtn  continue" data-id="{{$value.StuId}}-{{$value.StuName}}-{{$value.GradeId}}-{{$value.SchoolId}}-{{$value.EditionId}}">续课</span>
                {{/if}}

                        
					
                    </td>
                </tr>

			{{/each}}