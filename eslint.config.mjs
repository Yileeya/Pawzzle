// https://eslint.nuxt.com/packages/module
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.vue', '**/*.mjs'],  // 針對 TypeScript 和 Vue 文件
    rules: {
      'no-console': 'warn',  // 警告使用 console.log
      'semi': ['error', 'always'], // 語句的結尾分號
      'quotes': ['error', 'single'],  // 使用單引號，不是雙引號
      'comma-dangle': ['error', 'never'], // Object、Array 內的元素不需要尾隨逗號

      'object-curly-spacing': ['error', 'always'], // Object 的花括號內需要空格
      'array-bracket-spacing': ['error', 'never'], // Array 的方括號內不需要空格
      'computed-property-spacing': ['error', 'never'], // computed property 的方括號內不需要空格
      'block-spacing': ['error', 'always'], // 語句塊的花括號內需要空格
      'space-in-parens': ['error', 'never'], // 小括號內不需要空格
      
      'indent': ['error', 2], // 2個空格進行縮排
      'vue/html-indent': ['error', 2], // 2個空格進行縮排

      // 4. Vue 代碼中，單行可以同一行，換行時每行最多三個屬性
      'vue/max-attributes-per-line': ['error', {
        'singleline': 5,  // 單行最多 3 個屬性
        'multiline': {
          'max': 3  // 多行每行最多 1 個屬性
        }
      }],
      'vue/first-attribute-linebreak': ['error', {
        'singleline': 'ignore',  // 單行不強制換行
        'multiline': 'below'  // 多行屬性時，第一個屬性換行
      }]
    }
  }
);
