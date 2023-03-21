<script lang="ts">
export let tree = [
  {
    name: '/',
    type: 'dir',
    children: [
      {name: '_ChildComponent.astro'},
      {name: '_ParentComponent.astro'},
      {
        name: 'Whatever',
        children: [
          {name: 'Foo'},
          {name: 'Bar'},
          {
            name: 'Baz',
            children: [
              {name: 'Blip'},
              {name: 'Blap'}
            ]
          }
        ]
      }
    ]
  }
];

function mapRecursive <T>(
    oldArray: Array<T & { children?: T[] }>, 
    callback: (item: T) =>T, 
    newArray: T[] = []
  ): T[] {
    if(oldArray.length <= 0) {
      return newArray;
    } else {
      let [item, ...theRest] = oldArray;

      if(item.children) {
        item = {...item, children: mapRecursive<T>(item.children, callback)};
      }
      const interimArray: T[] = [...newArray, callback(item)];
      return mapRecursive<T>(theRest, callback, interimArray);
    }
}
</script>

<details>
  {#each tree as element}
    <summary>{element.name}</summary>
    {#if element.children}
      <ul>
        {#each element.children as child}
          <li>
          {#if child.children}
            <svelte:self tree={child.children} />
          {:else}
            {child.name}
          {/if}
          </li>
          {/each}
      </ul>
    {/if}
  {/each}
</details>
