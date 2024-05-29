FROM node:lts AS builder

# copy the build files into the container
COPY "." "/app"

# set the build directory as the workdir for operations
WORKDIR "/app"

# activate pnpm, install all dependencies and build the image
# then remove dev dependencies
RUN set -eux \
 && corepack enable \
 && pnpm install --frozen-lockfile \
 && pnpm run build \
 && pnpm install --frozen-lockfile --prod


FROM node:lts@sha256:bb40a9461b59c3e3ce2f65b4aea676eb3291ccad5dd51f32a298040c0ca9e9f0

# configure the workdir
WORKDIR "/usr/share/columba"

# copy all build files into the workdir
COPY --from=builder "/app/build/" "build/"
COPY --from=builder "/app/server/" "server/"
COPY --from=builder "/app/node_modules" "node_modules/"
COPY --from=builder "/app/package.json" "."
COPY --from=builder "/app/pnpm-lock.yaml" "."

# expose the web server so that it can be accessed
EXPOSE 3000

# run with minimum permissions as the node user
USER node

# just execute the nitro server within node
ENTRYPOINT ["node", "server"]
