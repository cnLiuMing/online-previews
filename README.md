# vue2实现pdf、excel、word、txt、图片在线预览

 - 快速上手
  1. install
   ```bash
    npm install online-previews
   ```
  2. 引入
   ```js
    import Previews from 'online-previews'
   ```
  3. 使用
   ```html
   <template>
      <Previews ref="previews" />
  </template>
   ```
   ```js
   this.$refs.previews.show(file.name, blob);
   ```
