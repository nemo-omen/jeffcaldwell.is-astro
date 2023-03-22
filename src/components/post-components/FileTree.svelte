<script lang="ts">
// import 'iconify-icon';
import Icon from '../Icon.svelte';

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
    <details open>
      <summary
        class="{element.highlight ? 'highlight' : ''} {element.delete ? 'delete' : ''}"
      > <span><Icon name="dir" label={element.name} /> {element.name}</span></summary>
      <svelte:self tree={[...element.children]}/>
    </details>
    </li>
    {:else}
    <li 
      class="file {element.highlight ? 'highlight' : ''} {element.delete ? 'delete' : ''}" 
      data-filetype={element.name.slice(element.name.lastIndexOf('.') + 1)}>
     <Icon name={element.name.slice(element.name.lastIndexOf('.') + 1)} label={element.name} /> {element.name}
    </li>
    {/if}
  {/each}
</ul>

<style>
ul {
  /* list-style: none; */
  font-family: var(--mono);
  border-inline-start: 2px solid hsl(var(--fg-hsl), 20%);
  margin: 0;
  margin-inline: .5em;
  padding: 0;
}

ul:not(li > details ul) {
  margin-inline: 0;
}

li {
  padding-inline: 1em;
}

li:not(details ul li) {
  padding-inline: 0;
}

ul:not(details > ul) {
  border-left: none;
}

summary {
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  display: list-item;
}

summary:hover {
  color: var(--secondary);
}

summary, li {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

summary::marker {
  color: var(--fg);
  display: inline-block;
}

.highlight {
  color: var(--primary);
}

.delete {
  text-decoration: line-through;
  color: hsl(var(--fg-hsl), 70%);
  /* text-decoration-thickness: 0.15ex; */
}
</style>
