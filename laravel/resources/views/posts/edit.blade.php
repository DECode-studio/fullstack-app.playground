<x-app-layout>
    <x-slot name="header">
        <h2 class="text-2xl font-semibold leading-tight text-base-content">
            {{ __('Edit Post') }}
        </h2>
    </x-slot>

    <div class="py-6">
        <div class="mx-auto max-w-3xl px-4">
            <div class="rounded-box bg-base-100 p-6 shadow">
                <form method="POST" action="{{ route('posts.update', $post) }}" class="space-y-6">
                    @csrf
                    @method('PUT')

                    <div class="form-control">
                        <label class="label" for="title">
                            <span class="label-text">{{ __('Title') }}</span>
                        </label>
                        <input id="title" name="title" type="text" value="{{ old('title', $post->title) }}" required class="input input-bordered w-full" />
                        <x-input-error :messages="$errors->get('title')" class="mt-2" />
                    </div>

                    <div class="form-control">
                        <label class="label" for="body">
                            <span class="label-text">{{ __('Content') }}</span>
                        </label>
                        <textarea id="body" name="body" rows="8" required class="textarea textarea-bordered w-full">{{ old('body', $post->body) }}</textarea>
                        <x-input-error :messages="$errors->get('body')" class="mt-2" />
                    </div>

                    <div class="flex items-center justify-end gap-3">
                        <a href="{{ route('posts.show', $post) }}" class="btn btn-ghost">
                            {{ __('Cancel') }}
                        </a>
                        <button type="submit" class="btn btn-primary">
                            {{ __('Save Changes') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
