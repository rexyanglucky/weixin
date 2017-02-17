{{each}}
 <tr>
                <td>{{$value.UserName}}</td>
                <td>{{$value.LoginId}}</td>
                <td>{{$value.RoleName}}</td>
                <td>
                    <span class="inline operatBtn active see-detail" data-id="{{$value.UserId}}">查看</span>
                </td>
            </tr>

			{{/each}}