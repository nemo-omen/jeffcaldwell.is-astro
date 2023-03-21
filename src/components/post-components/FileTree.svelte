<script lang="ts">
export let open = true;

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
          {name: 'Foo.txt'},
          {name: 'Bar.js'},
          {
            name: 'Baz',
            children: [
              {name: 'Blip.pdf'},
              {name: 'Blap.md'}
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

<ul>
  {#each tree as element}
    {#if element.children}
    <li class="dir" data-filetype="dir">
    <details {open}>
      <summary> 🗀  {element.name}</summary>
      <svelte:self tree={[...element.children]}/>
    </details>
    </li>
    {:else}
    <li class="file" data-filetype={element.name.slice(element.name.lastIndexOf('.') + 1)}>
     🗎 {element.name}
    </li>
    {/if}
  {/each}
</ul>

<style>
ul {
  list-style: none;
  font-family: var(--mono);
  border-left: 2px solid hsl(var(--fg-hsl), 20%);
}

ul:not(details > ul) {
  border-left: none;
}

summary {
  cursor: pointer;
}
</style>
