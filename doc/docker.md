

```
FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN
if [ -f yarn.lock ]; then yarn --frozen-lockfile;
elif [ -f package-lock.json ]; then npm ci;
elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile;
else echo "Lockfile not found." && exit 1;
fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```


```
这是一份使用 Docker 多阶段构建的 Next.js 应用程序的 Dockerfile。它分为三个阶段：deps、builder和runner。

在第一个阶段（deps）中，从 Node.js 18 Alpine 镜像作为基础镜像开始构建应用程序。然后安装 libc6-compat 库并设置工作目录为 /app，将 package.json 及其相关依赖文件（yarn.lock、package-lock.json或pnpm-lock.yaml）拷贝进该目录，并根据不同的锁定文件使用相应的包管理器来安装依赖。

在第二个阶段（builder），重复设置工作目录为 /app，并从第一个阶段的 deps 阶段中拷贝 node_modules 目录。然后再拷贝整个项目代码，并运行 yarn build 将 Next.js 应用程序编译为静态文件。

在第三个阶段（runner），同样设置工作目录为 /app，设置环境变量 NODE_ENV 为 production，并创建一个名为 nextjs 的用户及其所属的用户组，将所有权从 root 转移到该用户。然后从第二个阶段（builder）中拷贝 public 目录及 Next.js 应用程序编译后的静态文件，最后暴露 3000 端口并运行 server.js 文件。

这个 Dockerfile 可以让开发人员将 Next.js 应用程序打包为 Docker 容器，并在任何支持 Docker 的环境中运行。
```