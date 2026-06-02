import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { API_BASE_URL } from '@/constants';
import Slider from '@react-native-community/slider';
import { Redirect } from 'expo-router';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AuthForm } from '../auth/AuthForm';
import { useSession } from '../auth/SessionContext';
import { handleError, handleValidationError } from '../forms/utils';
import PaymentStub from './payment-stub';
import { loadTask, useTask } from './TaskContext';

const MAX_AMOUNT = 100;
const LENGTH_OPTIONS = ["15m", "30m", "1h", "2h", "4h", "8h", "12h", "1d", "2d", "3d"];

interface INewTaskType {
    title: string | null;
    length: string;
    amount: number;
}

export function NewTaskForm() {
    const { t } = useTranslation();
    const session = useSession();
    const { task, setTask } = useTask();
    const [paymentOpen, setPaymentOpen] = React.useState(false);
    
    React.useEffect(() => {
        loadTask(session, { task, setTask });
    }, [task, setTask, session]);
    const { control, handleSubmit } = useForm<INewTaskType>({
        defaultValues: {
            title: null,
            length: LENGTH_OPTIONS[0],
            amount: 0,
        },
    });

    if (!session.session.signed_in) {
        return <Redirect href="/login" />;
    }

    
    const onSuccess = async ({ response }: { response: Response }) => {
        setPaymentOpen(true);
        setTask({
            task_active: true,
            title: "abc",
            ends_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
            id: "123"
        })
    }
    
    return (
        <AuthForm
            className="gap-6"
            control={control}
            action={API_BASE_URL + 'vault/new'}
            method="post"
            encType="application/json"
            onSuccess={onSuccess}
            onError={handleError('vault_new', t)}
            render={({ submit }) => (
                <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full">
                    <CardHeader>
                        <CardTitle className="text-center text-xl sm:text-left">
                            {t('vault_new.headings.text1')}
                        </CardTitle>
                        <CardDescription className="text-center sm:text-left">
                            {t('vault_new.headings.text2')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="gap-6">
                        <View className="gap-6">
                            <Controller
                                control={control}
                                rules={{
                                    required: false,
                                    maxLength: 320,
                                    deps: 'title',
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View className="gap-1.5">
                                        <Label htmlFor="title">{t('vault_new.headings.title')}</Label>
                                        <Input
                                            id="title"
                                            returnKeyType="next"
                                            submitBehavior="submit"
                                            placeholder={t('vault_new.placeholders.title')}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value || ""}
                                        />
                                    </View>
                                )}
                                name="title"
                            />
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    min: 0,
                                    max: MAX_AMOUNT,
                                    deps: 'amount',
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View className="gap-1.5">
                                        <Label htmlFor="amount">{t('vault_new.headings.amount')}</Label>
                                        <Slider
                                            id="amount"
                                            minimumValue={0}
                                            maximumValue={MAX_AMOUNT}
                                            step={0.1}
                                            onBlur={onBlur}
                                            onValueChange={onChange}
                                            value={value}
                                        />
                                        <Text className="text-sm text-muted-foreground">
                                            {value.toFixed(2)}
                                        </Text>
                                    </View>
                                )}
                                name="amount"
                            />
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    deps: 'length'
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View className="gap-1.5">
                                        <Label htmlFor="amount">{t('vault_new.headings.length')}</Label>
                                        <Slider
                                            id="amount"
                                            minimumValue={0}
                                            maximumValue={LENGTH_OPTIONS.length - 1}
                                            step={1}
                                            onBlur={onBlur}
                                            onValueChange={index => onChange(LENGTH_OPTIONS[index])}
                                            value={LENGTH_OPTIONS.indexOf(value) === -1 ? 0 : LENGTH_OPTIONS.indexOf(value)}
                                        />
                                        <Text className="text-sm text-muted-foreground">
                                            {value}
                                        </Text>
                                    </View>
                                )}
                                name="length"
                            />
                            <Button
                                className="w-full"
                                onPress={handleSubmit(() => submit(), handleValidationError('vault_new', t))}
                            >
                                <Text>{t('vault_new.continue')}</Text>
                            </Button>
                        </View>
                        <PaymentStub open={paymentOpen} setOpen={setPaymentOpen} />
                    </CardContent>
                </Card>
            )}
        />
    );
}
