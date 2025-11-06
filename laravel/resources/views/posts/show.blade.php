<x-app-layout>
    <x-slot name="header">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
                <h2 class="text-2xl font-semibold leading-tight text-base-content">
                    {{ $post->title }}
                </h2>
                <p class="text-sm text-base-content/70">
                    {{ __('By :name on :date', [
                        'name' => $post->user->name ?? __('Unknown'),
                        'date' => $post->created_at->format('M j, Y'),
                    ]) }}
                </p>
            </div>

            @auth
                @if (auth()->id() === $post->user_id)
                    <div class="flex gap-2">
                        <a href="{{ route('posts.edit', $post) }}" class="btn btn-outline btn-sm">
                            {{ __('Edit') }}
                        </a>
                        <form action="{{ route('posts.destroy', $post) }}" method="POST" onsubmit="return confirm('{{ __('Are you sure you want to delete this post?') }}');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-error btn-sm">
                                {{ __('Delete') }}
                            </button>
                        </form>
                    </div>
                @endif
            @endauth
        </div>
    </x-slot>

    <div class="py-6">
        <div class="mx-auto max-w-3xl px-4">
            @if (session('status'))
                <div class="alert alert-success mb-4">
                    {{ session('status') }}
                </div>
            @endif

            <article class="rounded-box bg-base-100 p-6 shadow">
                <div class="whitespace-pre-line leading-relaxed text-base-content/90">
                    {{ $post->body }}
                </div>
            </article>
        </div>
    </div>
</x-app-layout>
