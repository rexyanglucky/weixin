<td>
  {{each}}
  <p>{{$value.SchoolName}}</p>

  {{/each}}
</td>
<td>
  {{each}}
  <p>{{$value.ClassName}}</p>
 
 {{/each}}
  </td>
  <td>{{each}}
  <p>{{$value.CourseName}}</p>
  
   {{/each}}</td>
<td>
  {{each}}

  {{if $value.IsWarn==1}}
  <p class="red">{{$value.HaveNumber}}/{{$value.BookNumber}}</p>
  {{else}}
  <p>{{$value.HaveNumber}}/{{$value.BookNumber}}</p>
  {{/if}}
 
  
   {{/each}}</td>
<td>
  {{each}}
  <p>{{$value.ExpireTime | dateFormat: "yyyy-MM-dd"}}</p>
  
   {{/each}}</td>