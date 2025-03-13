# Use a Debian base image
FROM debian:bookworm-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    nodejs \
    npm \
    tmux \
    zsh \
    build-essential \
    python3-dev \
    python3-pip \
    unzip \
    wget \
    ripgrep \
    fuse \
    kmod \
    && rm -rf /var/lib/apt/lists/*

# Install neovim nightly
RUN wget -O nvim.appimage https://github.com/neovim/neovim/releases/download/v0.10.4/nvim-linux-x86_64.appimage \
    && chmod +x nvim.appimage \
    && mv nvim.appimage /usr/local/bin/nvim \
    && modprobe fuse \
    && /usr/local/bin/nvim --version

# Install starship
RUN curl -sS https://starship.rs/install.sh | sh -s -- -y

# Create a non-root user
RUN useradd -ms /bin/zsh dev

# Clone ronfiles repository
RUN git clone https://github.com/RonaldLat/ronfiles /home/dev/ronfiles

# Copy zsh and starship config
RUN cp /home/dev/ronfiles/.zshrc /home/dev/.zshrc \
    # && cp /home/dev/ronfiles/starship.toml /home/dev/.config/starship.toml \
    && chown -R dev:dev /home/dev/

# Copy neovim config
RUN mkdir -p /home/dev/.config/nvim \
    && cp -r /home/dev/ronfiles/nvim/* /home/dev/.config/nvim/ \
    && chown -R dev:dev /home/dev/.config/nvim/

# Install lazy.nvim
RUN git clone --depth 1 https://github.com/folke/lazy.nvim.git /home/dev/.config/nvim/lua/lazy

# Install neovim plugins using lazy (run neovim in headless mode)
RUN su - dev -c '/usr/local/bin/nvim --headless -c "autocmd User PluginLazyInstall q" -c "packadd lazy.nvim" -c "Lazy sync" -c "q"'

# Set working directory
WORKDIR /app

# Expose port 3000 for Next.js (if needed)
EXPOSE 3000

# Set user and default command
USER dev
CMD ["tmux", "new-session", "-A", "-s", "dev", "zsh"]
